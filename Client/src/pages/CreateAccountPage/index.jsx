import React, { useState, useEffect } from 'react'

export default function CreateAccount() {
  const [textInput, setTextInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [color, setColor] = useState("orange")
  const [message,setMessage] = useState("")

  const handleTextInput = (e) => {
    setTextInput(e.target.value)
  }
  const handlePasswordInput = (e) => {
    setPasswordInput(e.target.value)
  }
  const handleSelect = (e) => {
    setColor(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    const register = async () => {
      try {
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
      setMessage("Account created!")
      setTimeout(()=> {
        setMessage("")
      }, 5000)
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
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Enter username...' onChange={handleTextInput} value={textInput} />
        <input type="password" placeholder='Enter password...' onChange={handlePasswordInput} value={passwordInput} />
        <select name='favColor' onChange={handleSelect}>
          <option value="orange">Orange</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
        </select>
        <input type="submit" value='Create Account' />
      </form>
      <h3>{message}</h3>
    </>
  )
}

