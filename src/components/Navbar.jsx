import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import Home from "../assets/home.svg";
import Wijet from "../assets/Widget.svg";
import User from "../assets/user.svg";

// Navbar component
const Navbar = () => {
  return (
    <div className="navbar">
      <NavLink 
        to="/" 
        className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
      >
        <img src={Home} alt="home" />
        <span>Home</span>
      </NavLink>
      <NavLink 
        to="/categories" 
        className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
      >
        <img src={Wijet} alt="categories" />
        <span>Categories</span>
      </NavLink>
      <NavLink 
        to="/profile" 
        className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
      >
        <img src={User} alt="profile" />
        <span>Profile</span>
      </NavLink>
    </div>
  );
};

export default Navbar;
