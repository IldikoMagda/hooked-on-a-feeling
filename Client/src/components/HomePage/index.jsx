import React, {useState,useEffect} from 'react';
import {useParams} from "react-router-dom"

import ProfileCard from "../ProfileCard";
import {TaskCard} from "../../components"
import {useAuth} from "../../contexts"
  
import BasicSprite from "../../assets/BasicSprite.png";
import BasicRed from "../../assets/Red/BasicRed.png";
import BasicGreen from "../../assets/Green/BasicGreen.png";
import BasicBlue from "../../assets/Blue/BasicBlue.png";
import BasicOrange from "../../assets/Orange/BasicOrange.png";


function HomePage() {
  const { user, setUser, userData } = useAuth()
  const [tasks, setTasks] = useState([]);
  async function fetchTasks() {
    const response = await fetch(`https://project-3-backend-l4m5.onrender.com/posts/${localStorage.getItem('user')}`)
    const data = await response.json()
    setTasks(data)
  }
  useEffect(() => {
    fetchTasks()
  }, [localStorage.getItem("user")])
 

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
        <ProfileCard />
      </div>

      <div className="right-box">
        <h1>Task List</h1>
        {/* <button>Create new task (creates modal)</button> */}
        {localStorage.getItem("user") && tasks.length>0 && tasks.map((el, i) => <TaskCard task={el} key={i}/>)}
      </div>
    </div>
  );
}

export default HomePage;
