import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

function UserProvider({ children }) {
  
  const [user, setUser] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    fetch("api/v1/me").then((res) => {
      if (res.ok) {
        res.json().then((data) => setUser(data));
        navigate("/events");
      } else {
        setUser(null);
        navigate("/");
      }
    });
  }, []);

  return <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>;
}

export { UserContext, UserProvider };