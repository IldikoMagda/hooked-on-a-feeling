import React from "react";
import { NavLink, Outlet } from "react-router-dom";

import "./style.css";

function Header() {
  return (
    <>
      <header className="rpg-header">
        <NavLink to="/" className="rpg-button">
          Home
        </NavLink>
        <NavLink to="/leaderboard" className="rpg-button">
          Leaderboard
        </NavLink>
        <NavLink to="/posts" className="rpg-button">
          Create New Task
        </NavLink>
        <NavLink to="/login" className="rpg-button">
          Logout
        </NavLink>
      </header>
      <Outlet />
    </>
  );
}

export default Header;
