import React, {useState} from 'react'
import {NavLink} from "react-router-dom"
import {useAuth} from "../../contexts"

export default function LoginPage() {
  const [textInput, setTextInput] = useState("")
  const [passwordInput,setPasswordInput] = useState("")
  const {setUser} = useAuth()
  const handleTextInput = (e) => {
    setTextInput(e.target.value)
  }
  const handlePasswordInput = () => {
    setPasswordInput(e.target.value)
  }

  const handleSubmit = () => {
    e.preventDefault()
    const login = async () => {
      const options = {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      }
      const response = await fetch("https://project-3-backend-l4m5.onrender.com/users/register", options);
      const data = await response.json();
      if (response.status == 200) {
        localStorage.setItem("token", data.token); //correct?
      } else {
        alert(data.error)
      }
    }
    login()
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <input type="text" placeholder='Enter username...' onChange={handleTextInput} value={textInput} />
        <input type="password" placeholder='Enter password...' onChange={handlePasswordInput} value={passwordInput} />
        <input type="submit" value="Login"/>
      </form>
      <NavLink to="/CreateAccount">Don't have an account? Register here</NavLink>
    </div>
  )
}


//async function loadPosts() {

// const options = {
//   headers: {
//       'Authorization': localStorage.getItem("token")
//   }
// }
// const response = await fetch("http://localhost:3000/posts", options);

// if (response.status == 200) {
//   const posts = await response.json();

//   const container = document.getElementById("posts");

//   posts.forEach(p => {
//       const elem = createPostElement(p);
//       container.appendChild(elem);
//   })
// } else {
//   window.location.assign("./index.html");
// }

// }

// document.getElementById('logout').addEventListener('click', () => {
// localStorage.removeItem('token');
// window.location.assign('./index.html');

// })

// loadPosts();