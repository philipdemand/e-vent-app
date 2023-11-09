import React, { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext'
import AttendeesList from './AttendeesList'

const Event = ({ event, onAttendanceRegistered, onChangeTotalAttendees, onDeleteAttendance }) => {

  const [attendees, setAttendees] = useState(1);
  const [errorData, setErrorData] = useState([])

  const {user} = useContext(UserContext)

  const hasUserId = () => {
    const attenObj = event.attendances.find(obj => obj.user_id === user.id);
    return attenObj
  }

  const handleRegister = () => {
    const user_id = user.id
    const postData = {
      user_id: user_id,
      total_attendees: parseInt(attendees)
    };
    fetch(`/events/${event.id}/attendances`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          response.json().then((data) => setErrorData(data.errors))
        }
      })
      .then((newAttendance) => {
        onAttendanceRegistered(newAttendance);
      })
      .catch((error) => {
        console.error('Network error:', error);
      });
  };

  const handleCancelRegistration = (id) => {
    fetch(`/events/${event.id}/attendances/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          onDeleteAttendance(id, event.id)
        } else {
          console.error('Failed to cancel registration:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Network error:', error);
      });
    setAttendees(1);
  };

  const eventTime = new Date(event.time).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const attendeesOptions = Array.from({ length: 10 }, (_, i) => (
    <option key={i} value={i + 1}>
      {i + 1}
    </option>
  ));
  
  return (
    <div className="event">
      {errorData.length > 0 ? <ul style={{ color: "red" }}>
          {errorData.map((error, i) => <li key={i}>{error}</li>)}
      </ul> : null}
      <h2>{event.title}</h2>
      <p>Date: {event.date}</p>
      <p>Time: {eventTime}</p>
      <p>Location: {event.address}</p>
      <p>Details: {event.details}</p>
      {hasUserId() ? (
        <div>
          <h4>You are registered for this event</h4>
        </div>
      ) : (
        <div>
          <h4>Register for this event</h4>
          <label>Total Number of Attendees: </label>
          <select value={attendees} onChange={(e) => setAttendees(e.target.value)}>
            {attendeesOptions}
          </select>
          <button onClick={handleRegister}>Register</button>
        </div>
      )}
      <div>
        <AttendeesList 
          event={event} 
          onCancelRegistration={handleCancelRegistration}
          onChangeTotalAttendees={onChangeTotalAttendees}
        />
      </div>
    </div>
  );
};

export default Event;