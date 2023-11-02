import { useAuth } from "../../contexts";
import getSpritePath from "../Sprites";
const ProfileCard = () => {
    const { userData } = useAuth();
  
    const safeFavcolor = userData.favcolor ? userData.favcolor.toLowerCase() : 'orange'
    const spritePath = getSpritePath(safeFavcolor, userData.generalXp);
  
  return (
    <div className="profile-card">
    <div className="profile-sprite">
      <img src={spritePath} alt="User Sprite" className="sprite" />
      
    </div>
    <div className="profile-header">
      <h2>{userData.username}</h2>
    </div>
    <div className="profile-info">
      <div className="left-half">
        <p>Generic XP: {userData.generalxp}</p>
        <p>Maths XP: {userData.subjectxpenglish}</p>
      </div>
      <div className="right-half">
        <p>Science XP: {userData.subjectxpmaths}</p>
        <p>English XP: {userData.subjectxpscience}</p>
      </div>
    </div>
  </div>
  );
};

export default ProfileCard;