import React, { useState, useEffect } from "react";

import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { } from "../../contexts"
import { useAuth } from "../../contexts"
import CreatePostModal from "../../components/CreatePostModal/CreatePostModal";
import Modal from "../Modal"
import Swal from 'sweetalert2'


function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { user, setUser, userData, setUserData } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [duedate, setDueDate] = useState('');
  const [subject, setSubject] = useState('');
  const [repeatable, setRepeatable] = useState(false);
  const [generalXp, setGeneralXp] = useState(50);
  const [subjectXp, setSubjectXp] = useState(50);


  const logout = () => {
    Swal.fire(
      'Logging Out',
      'Please wait to be redirected',
      'success'
    )
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

    if (localStorage.getItem("user")) {
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

        {localStorage.getItem("user") &&

          <div>
            <button className="rpg-button" onClick={openModal}>Create New Task</button>
            <Modal isOpen={isModalOpen} >

              <h2>Create Task</h2>
              <div className="create-task-modal">
                <CreatePostModal
                  title={title}
                  setTitle={setTitle}
                  content={content}
                  setContent={setContent}
                  duedate={duedate}
                  setDueDate={setDueDate}
                  subject={subject}
                  setSubject={setSubject}
                  repeatable={repeatable}
                  setRepeatable={setRepeatable}
                  generalXp={generalXp}
                  setGeneralXp={setGeneralXp}
                  subjectXp={subjectXp}
                  setSubjectXp={setSubjectXp}
                />
              </div>
              <button onClick={closeModal}>Close</button>
            </Modal>
          </div>
        }
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
