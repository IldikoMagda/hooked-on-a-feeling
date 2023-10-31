import React, {useState, useEffect} from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {useAuth} from "../../contexts"
import CreatePostModal from "../../components/CreatePostModal/CreatePostModal";

function Header() {
  const [isCreateTaskModalVisible, setCreateTaskModalVisible] = useState(false);
  const {user,setUser, userData, setUserData} = useAuth()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [duedate, setDueDate] = useState('')
  const [subject, setSubject] = useState('')
  const [repeatable, setRepeatable] = useState(false)
  const [generalXp, setGeneralXp] = useState(50)
  const [subjectXp, setSubjectXp] = useState(50)

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null)
    // setUserData({
    //   username: "",
    //     generalxp: 0,
    //     subjectxpmaths: 0,
    //     subjectxpenglish:0,
    //     subjectxpscience: 0,
    //     favcolor:""
    // })
  }
  const toggleCreateTaskModal = () => {
    setCreateTaskModalVisible(!isCreateTaskModalVisible);
  };
  return (
    <>
      <header className="rpg-header">
        <NavLink to="/" className="rpg-button">
          Home
        </NavLink>
        <NavLink to="/leaderboard" className="rpg-button">
          Leaderboard
        </NavLink>

        <button onClick={toggleCreateTaskModal} className="rpg-button">
          Create New Task
        </button>

        {!user && (
          <NavLink to="/login" className="rpg-button">
            Login
          </NavLink>
        )}
        {user && (
          <NavLink to="/login" onClick={logout} className="rpg-button">
            {"Hi " + userData.username} Logout
          </NavLink>
        )}
      </header>

      <Outlet />

      {isCreateTaskModalVisible && (
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
          <button onClick={toggleCreateTaskModal}>Close</button>
        </div>
      )}
    </>
  );
}

export default Header;
