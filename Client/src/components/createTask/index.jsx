import React from 'react';
import { useAuth } from '../../contexts';
import Swal from 'sweetalert2';

export default function CreateTaskForm({
  title,
  content,
  duedate,
  subject,
  repeatable,
  generalXp,
  subjectXp,
  setTitle,
  setContent,
  setDueDate,
  setSubject,
  setRepeatable,
  setGeneralXp,
  setSubjectXp,
}) {

function handleSubmit(e) {
    e.preventDefault();
    if (title) {
      fetch("https://project-3-backend-l4m5.onrender.com/posts", {
        method: 'POST',
        body: JSON.stringify({
          user_id: localStorage.getItem("user"), // set to 1 to try to make it work as I'm not logged in!!
          title: title,
          content: content,
          dueDate: duedate,
          subject: subject,
          generalXp: generalXp || 3,
          subjectXp: subjectXp || 3,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })

        .then((data) => {
          console.log('Post request successful:', data);
          Swal.fire('Task Added', 'Are you working hard or hardly working?', 'success');
        })
        .catch((err) => {
          console.log(err.message);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.message,
            footer: 'Make sure you fill out all the form.',
          });
        });
    } else {
      console.log('Title:', title);
      console.log('Content:', content);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Make sure you fill out all the form.',
      });
    }
  }

  return (
    <div className="homeworkModal-container">
      <form className="homeworkModal-content" onSubmit={handleSubmit}>
        <div className="homeworkModal-title">
          <label htmlFor="title" className="homeworkModal-label">
            Title:
          </label>
          <input
            type="text"
            id="title"
            placeholder="Title"
            className="homeworkModal-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
      </div>
      <div className="details">
        <label htmlFor="subject">Subject:</label>
        <select id="subject" value={subject} onChange={(e) => setSubject(e.target.value)}>
          <option value="Maths">Maths</option>
          <option value="Science">Science</option>
          <option value="English">English</option>
        </select>
        <br></br>
        <label htmlFor="duedate">Due Date:</label>
        <input
          type="date"
          id="duedate"
          name="duedate"
          value={duedate}
          onChange={(e) => setDueDate(e.target.value)}
          />
          <br></br>
          <label htmlFor="duedate">Due Date:</label>
          <input
            type="date"
            id="duedate"
            name="duedate"
            value={duedate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <button type="submit" className="homeworkModal-btn">Submit</button>
       </div>
      </form>
    </div>
  );
}