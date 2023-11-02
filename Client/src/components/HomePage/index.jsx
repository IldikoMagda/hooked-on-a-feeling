import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"

import ProfileCard from "../ProfileCard";
import { TaskCard } from "../../components"
import { useAuth } from "../../contexts"

import BasicSprite from "../../assets/BasicSprite.png";
import BasicRed from "../../assets/Red/BasicRed.png";
import BasicGreen from "../../assets/Green/BasicGreen.png";
import BasicBlue from "../../assets/Blue/BasicBlue.png";
import BasicOrange from "../../assets/Orange/BasicOrange.png";


function HomePage() {

  const { user, setUser, userData, setUserData, tasks, setTasks } = useAuth()
  
  async function fetchTasks() {
    const response = await fetch(`https://project-3-backend-l4m5.onrender.com/posts/${localStorage.getItem("user")}`)
    const data = await response.json()
    setTasks(data)
  }
  useEffect(() => {
    fetchTasks()
  }, [localStorage.getItem("user")])


  async function completeTask(id, task) {

    const addGeneralXp = async () => {
      // setUserData(prevData => ({ //dont seem to need this (works without)
      //   generalxp: prevData.generalxp + 50,
      //   ...prevData
      // }))
      const options = {
        method: "PATCH",
        body: JSON.stringify({
          generalxp:  userData.generalxp + 5
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      }
      const update = await fetch(`https://project-3-backend-l4m5.onrender.com/users/${localStorage.getItem("user")}`, options) 
      const updated = await update.json()
      console.log("this is what fetch update returns: ", updated)
    }
    const addMathsXp = async () => {
      const options = {
        method: "PATCH",
        body: JSON.stringify({
          subjectxpmaths:  userData.subjectxpmaths + 3
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      }
      const update = await fetch(`https://project-3-backend-l4m5.onrender.com/users/maths/${localStorage.getItem("user")}`, options) 
      const updated = await update.json()
      console.log("this is what fetch update returns: ", updated)
    }
    const addEnglishXp = async () => {
      const options = {
        method: "PATCH",
        body: JSON.stringify({
          subjectxpenglish:  userData.subjectxpenglish + 3
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      }
      const update = await fetch(`https://project-3-backend-l4m5.onrender.com/users/english/${localStorage.getItem("user")}`, options) 
      const updated = await update.json()
      console.log("this is what fetch update returns: ", updated)
    }
    const addScienceXp = async () => {
      const options = {
        method: "PATCH",
        body: JSON.stringify({
          subjectxpscience:  userData.subjectxpscience + 3
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      }
      const update = await fetch(`https://project-3-backend-l4m5.onrender.com/users/science/${localStorage.getItem("user")}`, options) 
      const updated = await update.json()
      console.log("this is what fetch update returns: ", updated)
    }

    const deleteTask = async () => {
      const options = {
        method: "DELETE"
      }
      const response = await fetch(`https://project-3-backend-l4m5.onrender.com/posts/Post/${id}`, options);
      if (response.ok){
        setTasks(tasks.filter(task => task.item_id == id))
        console.log(userData)
      } else{
        console.log(response)
      }
    }

    addGeneralXp()

    if (task.subject == "Maths") {
      addMathsXp()
    } else if (task.subject == "English") {
      addEnglishXp()
    } else if (task.subject == "Science") {
      addScienceXp()
    }

    deleteTask()
    window.location.reload()
  }

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

  return (
    <div className="home-container">
      <div className="left-box">
        <ProfileCard />
      </div>

      <div className="right-box">
        <h1>Task List</h1>
        {/* <button>Create new task (creates modal)</button> */}

        {localStorage.getItem("user") && tasks.length > 0 && tasks.map((el, i) => <TaskCard task={el} completeTask={completeTask} key={i} />)}

      </div>
    </div>
  );
}

export default HomePage;
