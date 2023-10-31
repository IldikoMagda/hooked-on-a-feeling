import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { Home } from '../../components'

export default function HomePage() {

  const [user, setUser] = useState();
  const [tasks, setTasks] = useState([]);
  const { id } = useParams();

  async function displayUser(id) {
    const response = await fetch(`https://project-3-backend-l4m5.onrender.com/users/${id}`);
    const data = await response.json();
    setUser(data);
    // console.log(data);

  }

  return (
    <>
      <Home />
    </>
  )

}
