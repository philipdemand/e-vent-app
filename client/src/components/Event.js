import React, { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext'
import AttendeesList from './AttendeesList'

const Event = ({ event, onAttendanceRegistered, onChangeTotalAttendees, onDeleteAttendance }) => {

  const [attendees, setAttendees] = useState(1);
  const [errorData, setErrorData] = useState([])

  const {user} = useContext(UserContext)

  const isUserRegistered = event.attendances.some(obj => obj.user_id === user.id);

  const handleRegister = () => {
    const postData = {
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
          return response.json().then((newAttendance) => {
            onAttendanceRegistered(newAttendance);
          })
        } else {
          response.json().then((data) => setErrorData(data.errors))
        }
      })
      
  };

  const handleCancelRegistration = (id) => {
    fetch(`/events/${event.id}/attendances/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          onDeleteAttendance(id, event.id);
        } else {
          response.json().then((data) => {
            const errorMessage = data.message || 'Failed to cancel registration';
            setErrorData([errorMessage]);
          })
        }
      })
      .finally(() => {
        setAttendees(1);
      });
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
      <h2>{event.title}</h2>
      <p>Date: {event.date}</p>
      <p>Time: {eventTime}</p>
      <p>Location: {event.address}</p>
      <p>Details: {event.details}</p>
      {isUserRegistered ? (
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
          {errorData.length > 0 ? <ul style={{ color: "red" }}>
          {errorData.map((error, i) => <li key={i}>{error}</li>)}
      </ul> : null}
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