import React, { useState } from "react"

export default function EditForm({ task, closeModal }) {
  const [title, setTitle] = useState(task.title)
  const [content, setContent] = useState(task.content)
  const [duedate, setDuedate] = useState(task.duedate)
  const [subject, setSubject] = useState(task.subject)

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
            generalXp: 20,
            subjectXp:10
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          }
        }
        const response = await fetch(`https://project-3-backend-l4m5.onrender.com/posts/post/${task.item_id}`, options)
        const data = await response
        if (response.status===200) {
          alert("Task edited succesfully")
        }
      } catch (err) {
        console.error(err.message)
      }
    }
    updateTask()
    closeModal()
  }

  

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="homeworkModal-title">
          <label htmlFor="title" className="homeworkModal-label">
            Title:
          </label>
          <input
            type="text"
            id="title"
            className="homeworkModal-input"
            value={title}
            onChange={handleTitle}
          />
        </div>
        <div className="homeworkModal-title">
          <label htmlFor="content" className="homeworkModal-label">
            Content:
          </label>
          <input
            type="text"
            id="content"
            className="homeworkModal-input"
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
        <button onClick={closeModal}>Back</button>
        <button type="submit" className="homeworkModal-btn">Submit Tasks</button>
        <button className="homeworkModal-btn" onClick={handleDelete}>Delete Task</button>
      </form>
    </>
  )
}