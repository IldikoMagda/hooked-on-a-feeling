import React from "react";
import ProfileCard from "../ProfileCard";
function HomePage() {

  return (
    <div className="home-container">
      <div className="left-box">
        <ProfileCard />
      </div>

      <div className="right-box">
        {/* Example of a single to-do item; you can map over your tasks array to display them */}
        <h1>Task List</h1>
        <div className="todo-item">
          <h3>Task Title</h3>
          <p>Due Date: MM/DD/YYYY</p>
          <p>XP Worth: XX</p>
          <input type="checkbox" /> Completed
        </div>
        {/* Add more to-do items as needed */}
      </div>
    </div>
  );
}

export default HomePage;
