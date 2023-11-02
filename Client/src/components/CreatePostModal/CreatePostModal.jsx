import React from 'react'
import {CreateTaskForm} from "../../components"

export default function CreatePostModal({
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
    handleSubmit,
    setIsModalOpen
  }) {
  return (
    <>
    <CreateTaskForm
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        duedate={duedate}
        setDueDate={setDueDate}
        subject={subject}
        setSubject={setSubject}
        repeatable={repeatable}
        setRepeatable={setRepeatable}
        generalXp={generalXp}
        setGeneralXp={setGeneralXp}
        subjectXp={subjectXp}
        setSubjectXp={setSubjectXp}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  )
}
