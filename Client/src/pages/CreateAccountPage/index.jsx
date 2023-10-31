import React, { useState , useEffect} from 'react'
import { NavLink , useNavigate} from 'react-router-dom'
import "./CreateAccountPage.css"
import {useAuth} from "../../contexts"
 

export default function CreateAccount() {
  const navigate = useNavigate()
  const [textInput, setTextInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [passwordInput2, setPasswordInput2] = useState('') //so user inputs correct password
  const [color, setColor] = useState("orange")
  const [message,setMessage] = useState("")
  const {user, setUser} = useAuth()

  const handleTextInput = (e) => {
    setTextInput(e.target.value)
  }
  const handlePasswordInput = (e) => {
    setPasswordInput(e.target.value)
  }
  const handlePasswordInput2 = (e) => {
    setPasswordInput2(e.target.value)
  }
  const handleSelect = (e) => {
    setColor(e.target.value)
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
        setTimeout(()=> {
          setMessage("")
        }, 700)
      } else {
        alert(data.error)
      }
    }

    const register = async () => {
      try {
        if (passwordInput == passwordInput2) {
          const options = {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: textInput,
              password: passwordInput,
              favColor: color
            })
          }
          const response = await fetch("https://project-3-backend-l4m5.onrender.com/users/register", options);
          const data = await response.json();
          if (response.status == 201) {
            login()
          }
        } else {
          setMessage("Passwords don't match. Try again.")
        }
    } catch (err) {
      console.error(err.message)
      setMessage("Register unsuccessful. Try again.")
      setTimeout(()=> {
        setMessage("")
      }, 5000)
    }
    }
    register()
    setTextInput("");
    setPasswordInput("")
    setPasswordInput2("")
  }

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await fetch(`https://project-3-backend-l4m5.onrender.com/users/${user}`);
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
      } catch (error) {
        // Handle network or other errors
        console.error('Error fetching user data:', error);
      }
    };
    getUserData()
  }, [user])
  return (
    <>
   <div className="register-container">
  <form className="register-form" onSubmit={handleSubmit}>
    <input className="register-input" type="text" placeholder='Enter username...' onChange={handleTextInput} value={textInput} />
    <input className="register-input" type="password" placeholder='Enter password...' onChange={handlePasswordInput} value={passwordInput} />
    <input className="register-input" type="password" placeholder='Enter password again...' onChange={handlePasswordInput2} value={passwordInput2} />
    <select className="register-input" name='favColor' onChange={handleSelect}>
      <option value="orange">Orange</option>
      <option value="red">Red</option>
      <option value="blue">Blue</option>
      <option value="green">Green</option>
    </select>
    <input className="register-button" type="submit" value='Create Account' />
  </form>
  <NavLink className="login-link" to="/login">Already have an account? Login</NavLink>
  <h3 className="register-message">{message}</h3>
</div>

    </>
  )
}
