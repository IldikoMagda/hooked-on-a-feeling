import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts"
import Swal from 'sweetalert2'
import SnailAnimation from '../../components/Snail/snail'


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
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", data.user_id);
        
        const responseRole = await fetch(`https://project-3-backend-l4m5.onrender.com/users/Role/${localStorage.getItem("user")}`);;
        const dataRole = await responseRole.json();
        localStorage.setItem("Role", dataRole);
        setUser(data.user_id)
        //setMessage("Login successful.")
        Swal.fire(
          'Login Successful',
          'Please wait to be redirected',
          'success'
        )


      } else {
        //alert(data.error)
        console.log("Login Error Test")
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: data.error,
          footer: 'Check you entered the correct details or register an account.'
        })
      }
    }
    login()
  }

  useEffect(() => {
    const getUserData = async () => {
    
      try {
        if (!localStorage.getItem("user")) {
          setUserData({
              username: "",
                generalxp: 0,
                subjectxpmaths: 0,
                subjectxpenglish:0,
                subjectxpscience: 0,
                favcolor:""
            })
        } else {
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
  }, [localStorage.getItem("user")])

  return (

    <div className="login-container">
      <SnailAnimation/>
      <form className="login-form" onSubmit={handleSubmit}>
        <input className="login-input" type="text" placeholder='Enter username...' onChange={handleTextInput} value={textInput} />
        <input className="login-input" type="password" placeholder='Enter password...' onChange={handlePasswordInput} value={passwordInput} />
        <input className="login-button" type="submit" value="Login" />
        <p>{message}</p>
      <NavLink className="register-link" to="/CreateAccount">Don't have an account? Register here</NavLink>

      </form>
    </div>
  )
}


//ADD THIS FOR AUTHORIZATION?
// const options = {
//   headers: {
//       'Authorization': localStorage.getItem("token")
//   }
// }
// const response = await fetch("http://localhost:3000/posts", options);
