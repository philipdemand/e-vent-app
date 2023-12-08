import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../contexts/UserContext'

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorData, setErrorData] = useState([])
  const navigate = useNavigate();

  const {setUser} = useContext(UserContext)

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    const user = {
      username: username,
      password: password,
    };
    fetch("/api/v1/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => {
            if (res.ok) {
              res.json().then((data) => setUser(data));
              setUsername("");
              setPassword("");
              navigate("/events");
            } else {
              res.json().then((data) => setErrorData(data.errors));
          }
    });
  }

  return (
    <div className="event">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Login</button>
        {errorData.length > 0 ? <ul style={{ color: "red" }}>
          {errorData.map((error, i) => <li key={i}>{error}</li>)}
        </ul> : null}
      </form>
    </div>
  );
};

export default LoginPage;