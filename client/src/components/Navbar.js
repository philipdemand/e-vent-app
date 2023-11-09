import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext'
import './styles.css';

const Navbar = () => {

    const navigate = useNavigate();

    const {user, setUser} = useContext(UserContext)

    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
          if (r.ok) {
            setUser(null);
          }
        });
        navigate("/login");
    }

  return (
    <nav className="navbar">
      {!user ? (<Link to="/" className="logo">
        E-Vent
        </Link>) 
          : 
        (<Link to="/events" className="logo">
          E-Vent
        </Link>)}
      { user ? <h4 className="identify">Welcome {user.username}!</h4> : null }
      { user ? <Link to="/userevents"><button className="logout-button">Your Registered Events</button></Link> : null }
      { user ? <button onClick={handleLogoutClick} className="logout-button">Logout</button> : null }
    </nav>
  );
};

export default Navbar;