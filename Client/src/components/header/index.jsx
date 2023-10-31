import React, {useState, useEffect} from "react";
import { NavLink, Outlet } from "react-router-dom";
import {useAuth} from "../../contexts"

function Header() {
  const {user,setUser, userData, setUserData} = useAuth()
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null)
    setUserData({
      username: "",
        generalxp: 0,
        subjectxpmaths: 0,
        subjectxpenglish:0,
        subjectxpscience: 0,
        favcolor:""
    })
  }
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
        {!user &&
        <NavLink to="/login" className="rpg-button">
            Login
        </NavLink>
        }
        {user && 
        <NavLink onClick={logout} className="rpg-button">
        {"Hi " + userData.username} Logout
    </NavLink>
        }
      </header>
      <Outlet />
    </>
  );
}

export default Header;
