import React, {useState,useEffect} from 'react';
import {useParams} from "react-router-dom"
import BasicSprite from '../../assets/BasicSprite.png';
import {TaskCard} from "../../components"
import {useAuth} from "../../contexts"

function HomePage() {
  const {user,setUser,userData} = useAuth()
  const [tasks, setTasks] = useState([]);
  const { id } = useParams();

  //dont need as this data is fetched during login
  // async function displayUser() {
  //   const response = await fetch(`https://project-3-backend-l4m5.onrender.com/users/${user}`);
  //   const data = await response.json();
  //   setUser(data);
  // }


  async function fetchTasks() {
    const response = await fetch(`https://project-3-backend-l4m5.onrender.com/posts/${user}`)
    const data = await response.json()
    setTasks(data)
  }
  useEffect(()=> {
    fetchTasks()
  },[user])
  
  //mock tasks
  // const tasks = [
  //   {
  //   "item_id": 1,
  //   "user_id": 18,
  //   "title": "Complete Math homework assignments.",
  //   "content": "Complete Mr Abduls Homework",
  //   "duedate": "2023-10-09T00:00:00.000Z",
  //   "subject": "Maths",
  //   "completed": false,
  //   "repeatable": false,
  //   "generalxp": 3,
  //   "subjectxp": 19
  //   },
  //   {
  //   "item_id": 2,
  //   "user_id": 18,
  //   "title": "Study for upcoming Maths exam.",
  //   "content": "Read through the book and create notes",
  //   "duedate": "2023-04-19T00:00:00.000Z",
  //   "subject": "Maths",
  //   "completed": false,
  //   "repeatable": false,
  //   "generalxp": 10,
  //   "subjectxp": 15
  //   },
  //   {
  //   "item_id": 3,
  //   "user_id": 18,
  //   "title": "Work on the English literature essay.",
  //   "content": "Read 10 pages Of Mice and Men",
  //   "duedate": "2023-12-25T00:00:00.000Z",
  //   "subject": "English",
  //   "completed": false,
  //   "repeatable": false,
  //   "generalxp": 2,
  //   "subjectxp": 19
  //   }
  //   ]

  return (
    <div className="home-container">
      <div className="left-box">
        <img src={BasicSprite} alt="User Sprite" className="sprite"/>
        <h2>Folklorien</h2>
        <div className="xp-section">
          <p>Generic XP: 500</p>
          <p>Maths XP: 249</p>
          <p>Science XP: 141</p>
          <p>English XP: 335</p>
        </div>
      </div>

      <div className="right-box">
        {user && tasks.map((el,i)=><TaskCard task={el}/>)}
      
      </div>
    </div>
  );
}

export default HomePage;
