import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import EventList from './components/EventList';
import CreateEvent from './components/CreateEvent';
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import UserEvents from './components/UserEvents'
import { UserContext } from './contexts/UserContext'

function App() {

  const [events, setEvents] = useState([])

  const {user} = useContext(UserContext);
  const {setUser} = useContext(UserContext)

  useEffect(() => {
    fetch('/events')
    .then((res) => res.json())
    .then((data) => setEvents(data))
    .catch((error) => console.error('Error fetching events:', error));
  }, [])

  const handleAddEvent = (object) => {
    const newObj = {...object, attendances: []}
    setEvents([...events, newObj])
  }

  const handleAttendanceRegistered = (newAttendance) => {
    const updatedEvents = events.map((event) => {
      if (event.id === newAttendance.event_id) {
        return {
          ...event,
          attendances: [...event.attendances, newAttendance],
        };
      }
      return event;
    });
    setEvents(updatedEvents);
    const targetEvent = events.find(event => event.id === newAttendance.event_id)
    const updatedUser = {
      ...user,
      events: [...user.events, targetEvent]
    };
    setUser(updatedUser)
  };

  const handleChangeTotalAttendees = (object) => {
    const updatedEvents = events.map((event) => {
      if (event.id === object.event_id) {
        return {
          ...event,
          attendances: event.attendances.map(att => att.id === object.id ? object : att)
        };
      }
      return event;
    });
  
    setEvents(updatedEvents);
  };

  const handleDeleteAttendance = (attId, eventId) => {
    const updatedEvents = events.map((event) => {
      return {
        ...event,
        attendances: event.attendances.filter((attendance) => attendance.id !== attId),
      };
    });
    setEvents(updatedEvents);
    const updatedUserEvents = user.events.filter(event => event.id !== eventId)
    const updatedUser = {
      ...user,
      events: updatedUserEvents
    };
    setUser(updatedUser)
  }

  return (
    <>
    <Navbar />
    {!user ? (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    ) : (
      <Routes>
        <Route path="/userevents"
          element={<UserEvents />} />
        <Route path="/" 
          element={<LandingPage />} 
      />
        <Route path="/events" 
          element={<EventList 
            events={events} 
            onAttendanceRegistered={handleAttendanceRegistered}
            onChangeTotalAttendees={handleChangeTotalAttendees}
            onDeleteAttendance={handleDeleteAttendance}
          />} 
        />
        <Route path="/events/create" 
          element={<CreateEvent 
            onAddEvent={handleAddEvent}
          />} 
        />
      </Routes>
    )}
    </>
  );
};

export default App;