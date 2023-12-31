import React, { useState } from "react"
import {useAuth} from "../../contexts"
import Swal from 'sweetalert2'


export default function EditForm({ task, closeModal}) {
  const {setTasks} = useAuth()
  const [title, setTitle] = useState(task.title)
  const [content, setContent] = useState(task.content)
  const [duedate, setDuedate] = useState(task.duedate.substring(0, 10))
  const [subject, setSubject] = useState(task.subject)

  const fetchTasks = async () => {
    const response = await fetch(`https://project-3-backend-l4m5.onrender.com/posts/${localStorage.getItem('user')}`)
    const data = await response.json()
    setTasks(data)
  }

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }
  const handleContent = (e) => {
    setContent(e.target.value)
  }
  const handleSubject = (e) => {
    setSubject(e.target.value)
  }
  const handleDuedate = (e) => {
    setDuedate(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    
    const updateTask = async () => {
      try {
        const options = {
          method: "PATCH",
          body: JSON.stringify({
            title: title,
            content: content,
            dueDate: duedate,
            subject: subject,
            generalXp: 5,
            subjectXp: 3
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          }
        }
        const response = await fetch(`https://project-3-backend-l4m5.onrender.com/posts/post/${task.item_id}`, options)
        const data = await response
        if (response.status === 200) {
          
          Swal.fire(
            'Task Edited',
            'Having fun yet?',
            'success'
          )
          fetchTasks()
        }
      } catch (err) {
        console.error(err.message)
      }
    }
    updateTask()
    closeModal()
  }

  const handleDelete = () => {
    const deleteTask = async () => {
      try {
        const options = {
          method: "DELETE"
        }
        const response = await fetch(`https://project-3-backend-l4m5.onrender.com/posts/post/${task.item_id}`, options)
        const data = await response.json()
        fetchTasks() // move to if statement below once deployed api is updated
        console.log("Status",response.status)
        if (response.status===200) {
          Swal.fire(
            'Task Deleted',
            'Add more tasks',
            'success'
          )
        }
      } catch (err) {
        console.error(err.message)
      }
    }
    deleteTask()
    closeModal()
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="editTask-title">
          <label htmlFor="title" className="editTask-label">
            Title:
          </label>
          <input
            type="text"
            id="title"
            className="editTask-input"
            value={title}
            onChange={handleTitle}
          />
        </div>
        <div className="editTask-title">
          <label htmlFor="content" className="editTask-label">
            Content:
          </label>
          <textarea
            id="content"
            className="editTask-textarea"
            value={content}
            onChange={handleContent}
          />
        </div>
        <label htmlFor="subject">Subject:</label>
        <select id="subject" value={subject} onChange={handleSubject}>
          <option value="Maths">Maths</option>
          <option value="Science">Science</option>
          <option value="English">English</option>
        </select>
        <label htmlFor="duedate">Due Date:</label>
        <input
          type="date"
          id="duedate"
          name="duedate"
          value={duedate}
          onChange={handleDuedate}
        />
        <div className="button-container">
          <button type="submit" className="editTask-btn">Submit Tasks</button>
                <button onClick={closeModal}>Back</button>
                <button className="editTask-btn" onClick={handleDelete}>Delete Task</button>
        </div>
      </form>
    </>
  )
}
