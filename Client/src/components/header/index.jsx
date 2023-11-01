import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { } from "../../contexts"
import { useAuth } from "../../contexts"

function Header() {
  const navigate = useNavigate()
  const { user, setUser, userData, setUserData } = useAuth()
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user')
    setUser(null) //unnecessary?
    setUserData({
      username: "",
      generalxp: 0,
      subjectxpmaths: 0,
      subjectxpenglish: 0,
      subjectxpscience: 0,
      favcolor: ""
    })

  }
  useEffect(() => { //onLoad or user_id change, get userData
    const getUserData = async () => {
      const response = await fetch(`https://project-3-backend-l4m5.onrender.com/users/${localStorage.getItem("user")}`);
      if (response.ok) {
        const data = await response.json();
        setUserData({
          username: data.username,
          generalxp: data.generalxp,
          subjectxpmaths: data.subjectxpmaths,
          subjectxpenglish: data.subjectxpenglish,
          subjectxpscience: data.subjectxpscience,
          favcolor: data.favcolor
        });
      }
    }

    if(localStorage.getItem("user")) {
      getUserData()
    }
  }, [localStorage.getItem("user")])

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
        {!localStorage.getItem('user') &&
          <NavLink to="/login" className="rpg-button">
            Login
          </NavLink>
        }

        {localStorage.getItem('user') &&
          <NavLink to="/login" onClick={logout} className="rpg-button">
            {"Hi " + userData.username} Logout
          </NavLink>

        }
      </header>
      <Outlet />
    </>
  );
}

export default Header;
