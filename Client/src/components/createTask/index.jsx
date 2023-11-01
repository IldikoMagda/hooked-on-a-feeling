import React, { useState } from 'react';
import { useAuth } from '../../contexts';
import Swal from 'sweetalert2'


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
  const { user } = useAuth();


    function handleSubmit(e){
        e.preventDefault();
        if (title && content){
            fetch("https://project-3-backend-l4m5.onrender.com/posts",{
                method: 'POST',
                body: JSON.stringify({
                    "user_id": localStorage.getItem("user"), 
                    "title": title,
                    "content": content,
                    "dueDate": duedate,
                    "subject": subject,
                    "generalXp": generalXp || 3,
                    "subjectXp": subjectXp || 3,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then((res)=> res.json())
            
            .then((data) =>{
                console.log('Post request successful:', data);
                Swal.fire(
                  'Task Added',
                  'Are you working hard or hardly working?',
                  'success'
                )

            })
            .catch((err)=>{
                console.log(err.message)
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: err.message,
                  footer: 'Make sure you fill out all the form.'
                })
            })
            }
            else{
                console.log('Title:', title);
                console.log('Content:', content);
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Make sure you fill out all the form.'
                })
            }
        }


        .then((data) => {
          console.log("Post request successful:", data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      console.log("Title:", title);
      console.log("Content:", content);
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
        <label htmlFor="repeatable">Repeatable:</label>
        <input
          type="checkbox"
          id="repeatable"
          name="repeatable"
          checked={repeatable}
          onChange={() => setRepeatable(!repeatable)}
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
          <label htmlFor="duedate">Due Date:</label>
          <input
            type="date"
            id="duedate"
            name="duedate"
            value={duedate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <div>
            <label htmlFor="generalXp">General XP:</label>
            <input
              type="number"
              id="generalXp"
              min="0"
              max="50"
              value={generalXp}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value) && value >= 0 && value <= 50) {
                  setGeneralXp(value);
                }
              }}
            />
          </div>
          <div>
            <label htmlFor="subjectXp">Subject XP:</label>
            <input
              type="number"
              id="subjectXp"
              min="0"
              max="50"
              value={subjectXp}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value) && value >= 0 && value <= 50) {
                  setSubjectXp(value);
                }
              }}
            />
          </div>
          <button type="submit" className="homeworkModal-btn">Submit</button>
        </div>
      </form>
    </div>
  );
}
