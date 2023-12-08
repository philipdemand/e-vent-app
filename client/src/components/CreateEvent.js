import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const CreateEvent = ({ onAddEvent }) => {

  const [errorData, setErrorData] = useState([])
  const [eventData, setEventData] = useState({
    title: '',
    address: '',
    date: '',
    time: '',
    details: '',
  });

  const navigate = useNavigate();

  const resetForm = () => {
    setEventData({
      title: '',
      address: '',
      date: '',
      time: '',
      details: '',
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      title: eventData.title,
      address: eventData.address,
      date: eventData.date,
      time: eventData.time,
      details: eventData.details,
    };
    fetch("/api/v1/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => onAddEvent(data));
        resetForm();
        navigate("/events");
      } else {
        res.json().then((data) => setErrorData(data.errors));
      }
    });
  }

  return (
    <div className="event">
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={eventData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={eventData.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={eventData.date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="time">Time:</label>
          <input
            type="time"
            id="time"
            name="time"
            value={eventData.time}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="details">Event Details:</label>
          <textarea
            id="details"
            name="details"
            value={eventData.details}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create Event</button>
        {errorData.length > 0 ? <ul style={{ color: "red" }}>
          {errorData.map((error, i) => <li key={i}>{error}</li>)}
        </ul> : null}
      </form>
    </div>
  );
};

export default CreateEvent