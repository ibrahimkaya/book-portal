import React from "react";
import { Link } from "react-router-dom";

function Navbar({ title }) {
  return (
    <nav className="navbar-nav navbar-expand-lg navbar-dark bg-dark mb-3 p-3">
      <a href="/" className="navbar-brand">
        {title}
      </a>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item active">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item active">
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
        </li>
        <li className="nav-item active">
          <Link to="/logout" className="nav-link">
            logout
          </Link>
        </li>
        <li className="nav-item active">
          <Link to="/register" className="nav-link">
            register
          </Link>
        </li>
      </ul>
    </nav>
  );
}

Navbar.defaultProps = {
  title: "Default App",
};
export default Navbar;
