import React from 'react';
import Event from './Event'
import { Link } from 'react-router-dom';

const EventList = ({ events, onAttendanceRegistered, onChangeTotalAttendees, onDeleteAttendance }) => {

  return (
    <div>
      <Link to="/api/v1/events/create">
          <button className="createbutton">Create Event</button>
      </Link>
      {events.map((event) => (
            <Event
              key={event.id}
              event={event}
              onAttendanceRegistered={onAttendanceRegistered}
              onChangeTotalAttendees={onChangeTotalAttendees}
              onDeleteAttendance={onDeleteAttendance}
            />
          ))}
    </div>
  );
};

export default EventList;