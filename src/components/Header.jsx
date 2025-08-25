import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "nav-link active" : "nav-link";
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <div className="logo-content">
              <img src="/hr-group.svg" alt="HR Group" className="logo-icon" />
              <div className="logo-text">
                <h1>Mini HRMS</h1>
                <span>Employee Management System</span>
              </div>
            </div>
          </Link>

          <nav className="nav">
            <Link to="/" className={isActive("/")}>
              Employee List
            </Link>
            <Link to="/add-employee" className={isActive("/add-employee")}>
              Add Employee
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
