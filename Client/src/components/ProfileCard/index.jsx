import React from "react";
import BasicSprite from "../../assets/BasicSprite.png";

const ProfileCard = ({ user }) => {
  return (
    <div className="profile-card">
      <div className="profile-sprite">
        <img src={BasicSprite} alt="User sprite" />
      </div>
      <div className="profile-header">
        <h2>Folklorien</h2>
      </div>
      <div className="profile-info">
        <p>XP: 500</p>
        <p>Maths XP: 25</p>
        <p>Science XP: 36</p>
        <p>English XP: 45</p>
      </div>
    </div>
  );
};

export default ProfileCard;
