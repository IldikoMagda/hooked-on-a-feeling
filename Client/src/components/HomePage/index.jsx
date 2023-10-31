import React from 'react';
import BasicSprite from '../../assets/BasicSprite.png';

function HomePage() {
  return (
    <div className="home-container">
      <div className="left-box">
        <img src={BasicSprite} alt="User Sprite" className="sprite"/>
        <h2>Folklorien</h2>
        <div className="xp-section">
          <p>Generic XP: 500</p>
          <p>Maths XP: 249</p>
          <p>Science XP: 141</p>
          <p>English XP: 335</p>
        </div>
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
