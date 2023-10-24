import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';

const Navbar = ({ setUser, user }) => {

    const navigate = useNavigate();

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
      <Link to="/" className="logo">
        E-Vent
      </Link>
      { user ? <h4 className="identify">Welcome {user.username}!</h4> : null }
      { user ? <button onClick={handleLogoutClick} className="logout-button">Logout</button> : null }
    </nav>
  );
};

export default Navbar;