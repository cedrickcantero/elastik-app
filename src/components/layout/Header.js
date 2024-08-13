import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  // Example: Assume the user details are stored in session storage
  const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
  const username = userDetails?.Username;

  const logoutUser = () => {
    // Clear user session or any stored tokens
    sessionStorage.removeItem("userDetails");
    // Redirect to the login page or home
    navigate("/login");
  };

  return (
    <header className="app-header">
      <h1>
        <Link to="/">Elastik App</Link>
      </h1>
      <nav>
        <ul className="nav-list">
          <li className="nav-item">
            <span className="user-info">Welcome, {username}</span>
          </li>
          <li className="nav-item">
            <Link to="/" onClick={logoutUser}>
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
