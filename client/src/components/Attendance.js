import React, { useState, useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

function Attendance({ attendance, onCancelRegistration, onChangeTotalAttendees }) {

    const {username, user_id, id, total_attendees, event_id} = attendance

    const [isClicked, setIsClicked] = useState(false)
    const [attendees, setAttendees] = useState(1);

    const {user} = useContext(UserContext)

    const onEditAttendees = () => {
        setIsClicked(true)
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
        .then((r) => r.json())
        .then(attendanceObject => onChangeTotalAttendees(attendanceObject))
        .then(setIsClicked(false))
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
        </div>
    )
}

export default Attendance