import React from "react";
import { NavLink, Outlet } from "react-router-dom";

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
        <NavLink to="/create-task" className="rpg-button">
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
