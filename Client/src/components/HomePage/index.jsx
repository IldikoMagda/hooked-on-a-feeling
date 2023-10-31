
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"

import { TaskCard } from "../../components"
import { useAuth } from "../../contexts"


import BasicSprite from "../../assets/BasicSprite.png";
import BasicRed from "../../assets/Red/BasicRed.png";
import BasicGreen from "../../assets/Green/BasicGreen.png";
import BasicBlue from "../../assets/Blue/BasicBlue.png";
import BasicOrange from "../../assets/Orange/BasicOrange.png";


function HomePage() {
  const { user, setUser, userData } = useAuth()
  // const [tasks, setTasks] = useState([]);
  async function fetchTasks() {
    const response = await fetch(`https://project-3-backend-l4m5.onrender.com/posts/${user}`)
    const data = await response.json()
    setTasks(data)
  }
  // useEffect(() => {
  //   fetchTasks()
  // }, [user])
 const tasks = [{
  "item_id": 1,
  "user_id": 1,
  "title": "Complete Math homework assignments.",
  "content": "Complete Mr Abduls Homework",
  "duedate": "2023-10-09T00:00:00.000Z",
  "subject": "Maths",
  "completed": false,
  "repeatable": false,
  "generalxp": 3,
  "subjectxp": 19
  }]

  let userSprite = ""

  const getSpritePath = (color) => {
    switch (color) {
      case 'orange':
        return BasicOrange;
      case 'green':
        return BasicGreen;
      case 'red':
        return BasicRed;
      case 'blue':
        return BasicBlue;
      default:
        return BasicSprite; // Default path if color is not matched
    }
  };

  // Get the sprite path
  const spritePath = getSpritePath(userData.favcolor);
  console.log(spritePath);

  return (
    <div className="home-container">
      <div className="left-box">
        <div className="profile-card">
          <div className="profile-sprite">
            <img src={spritePath} alt="User Sprite" className="sprite" />

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
        <button>Create new task (creates modal)</button>
        {user && tasks.length>0 && tasks.map((el, i) => <TaskCard task={el} />)}
      </div>
    </div>
  );
}

export default HomePage;
