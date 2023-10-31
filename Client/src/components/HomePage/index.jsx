import React from "react";
import BasicSprite from "../../assets/BasicSprite.png";
import { useAuth } from "../../contexts";

function HomePage() {
  const { userData } = useAuth();
  console.log(userData);

  return (
    <div className="home-container">
      <div className="left-box">
        <div className="profile-card">
          <div className="profile-sprite">
            <img src={BasicSprite} alt="User Sprite" className="sprite" />
          </div>
          <div className="profile-header">
            <h2>{userData.username}</h2>
          </div>
          <div className="profile-info">
            <div className="left-half">
              <p>Generic XP: {userData.generalxp}</p>
              <p>Maths XP: {userData.subjectxpenglish}</p>
            </div>
            <div className="right-half">
              <p>Science XP: {userData.subjectxpmaths}</p>
              <p>English XP: {userData.subjectxpscience}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="right-box">
        {/* Example of a single to-do item; you can map over your tasks array to display them */}
        <h1>Task List</h1>
        <div className="todo-item">
          <h3>Task Title</h3>
          <p>Due Date: MM/DD/YYYY</p>
          <p>XP Worth: XX</p>
          <input type="checkbox" /> Completed
        </div>
        {/* Add more to-do items as needed */}
      </div>
    </div>
  );
}

export default HomePage;
