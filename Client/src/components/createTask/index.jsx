import React, { useState } from 'react';
import { useAuth } from '../../contexts';

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
        if (title && content && title.length && content.lenght>0){
            fetch("https://project-3-backend-l4m5.onrender.com/posts/",{
                method: 'POST',
                body: JSON.stringify({
                    "user_id": user,
                    "title": title,
                    "content": content,
                    "dueDate": duedate,
                    "subject": subject,
                    "generalxp": generalXp,
                    "subjectxp": subjectXp
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then((res)=> res.json())
            
            .then((data) =>{
                console.log('Post request successful:', data);
            })
            .catch((err)=>{
                console.log(err.message)
            })
            }
            else{
                console.log('Title:', title);
                console.log('Content:', content);
            }
        }


  return (
    <form onSubmit={handleSubmit}>
      <div className="Title">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="Content">
        <input
          type="text"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="details">
        <select value={subject} onChange={(e) => setSubject(e.target.value)}>
          <option value="Maths">Maths</option>
          <option value="Science">Science</option>
        </select>
        <input
          type="checkbox"
          name="repeatable"
          checked={repeatable}
          onChange={() => setRepeatable(!repeatable)}
        />
        <input
          type="date"
          name="duedate"
          value={duedate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        {/* NumericInput for General XP */}
        {/* NumericInput for Subject XP */}
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}
