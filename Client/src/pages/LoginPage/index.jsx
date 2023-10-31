import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts"

export default function LoginPage() {
  const navigate = useNavigate()
  const [textInput, setTextInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  const [message, setMessage] = useState("")
  const { user, setUser, setUserData } = useAuth()

  const handleTextInput = (e) => {
    setTextInput(e.target.value)
  }
  const handlePasswordInput = (e) => {
    setPasswordInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()


    const login = async () => {
      const options = {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: textInput,
          password: passwordInput
        })
      }
      const response = await fetch("https://project-3-backend-l4m5.onrender.com/users/login", options);
      const data = await response.json();

      if (response.status == 200) {
        localStorage.setItem("token", data.token); //correct?
        setUser(data.user_id)
        setMessage("Login successful.")


      } else {
        alert(data.error)
      }
    }
    login()
  }

  useEffect(() => {
    const getUserData = async () => {
      console.log(user)
      try {
        if (user == null) {
          setUserData({
              username: "",
                generalxp: 0,
                subjectxpmaths: 0,
                subjectxpenglish:0,
                subjectxpscience: 0,
                favcolor:""
            })
        } else {
          const response = await fetch(`https://project-3-backend-l4m5.onrender.com/users/${user}`);
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            setUserData({
              username: data.username,
              generalxp: data.generalxp,
              subjectxpmaths: data.subjectxpmaths,
              subjectxpenglish: data.subjectxpenglish,
              subjectxpscience: data.subjectxpscience,
              favcolor: data.favcolor
            });
            setTimeout(() => {
              setMessage("")
              navigate("/")
            }, 700)
          } else {
            console.error(`Failed to fetch user data. Status code: ${response.status}`);
          }
        }
      } catch (error) {
        // Handle network or other errors
        console.error('Error fetching user data:', error);
      }
    };
    getUserData()
  }, [user]) //

  return (

    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <input className="login-input" type="text" placeholder='Enter username...' onChange={handleTextInput} value={textInput} />
        <input className="login-input" type="password" placeholder='Enter password...' onChange={handlePasswordInput} value={passwordInput} />
        <input className="login-button" type="submit" value="Login" />
      </form>
      <p>{message}</p>
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
