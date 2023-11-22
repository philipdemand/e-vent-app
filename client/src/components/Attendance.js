import React, { useState, useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

function Attendance({ attendance, onCancelRegistration, onChangeTotalAttendees }) {

    const {username, user_id, id, total_attendees, event_id} = attendance

    const [isClicked, setIsClicked] = useState(false)
    const [attendees, setAttendees] = useState(1);
    const [errorData, setErrorData] = useState([])

    const {user} = useContext(UserContext)

    const onEditAttendees = () => {
        setIsClicked(true)
        setAttendees(attendance.total_attendees)
    }

    const attendeesOptions = Array.from({ length: 10 }, (_, i) => (
        <option key={i} value={i + 1}>
          {i + 1}
        </option>
      ));

      const handleSubmitAttendees = () => {
        fetch(`/events/${event_id}/attendances/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({total_attendees: parseInt(attendees)}),
        })
        .then((res) => {
          if (res.ok) {
            res.json().then((attendanceObject) => onChangeTotalAttendees(attendanceObject))
            setIsClicked(false)
            setErrorData([])
          } else {
            res.json().then((data) => setErrorData(data.errors));
          }
        })
      };
    
    return (
        <div>
            <li>
              {username} with {total_attendees} {total_attendees === 1 ? "attendee" : "attendees"}
              {user.id === user_id ? <button onClick={() => onCancelRegistration(id)}>Cancel Registration</button> : null}
              <div>
              {user.id === user_id && !isClicked ? 
                  <button onClick={() => onEditAttendees(id)}>Change Number of Attendees</button>
              : null}
              {isClicked ? <div>
              <label>Total Number of Attendees:</label>
              <select value={attendees} onChange={(e) => setAttendees(e.target.value)}>
                {attendeesOptions}
              </select>
              <button onClick={handleSubmitAttendees}>Submit</button>
              </div> : null}
              </div>
            </li>
            {errorData.length > 0 ? <ul style={{ color: "red" }}>
            {errorData.map((error, i) => <li key={i}>{error}</li>)}
          </ul> : null}
        </div>
    )
}

export default Attendance