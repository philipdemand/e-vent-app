import React from 'react'
import Attendance from './Attendance'

function AttendeesList({ event, onCancelRegistration, onChangeTotalAttendees }) {

    return(
        <div className="event">
          <h2>Registered Attendees:</h2>
          <ul>
            {event.attendances.map(attendance => 
            <Attendance 
              key={attendance.id} 
              attendance={attendance} 
              onCancelRegistration={onCancelRegistration} 
              onChangeTotalAttendees={onChangeTotalAttendees}
            />)}
          </ul>
        </div>
    )
}

export default AttendeesList