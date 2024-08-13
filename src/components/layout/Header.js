import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const logoutUser = () => {};

  return (
    <header>
      <h1>
        <Link to="/">Elastik App</Link>
      </h1>
      <nav>
        <ul>
          <li>
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
