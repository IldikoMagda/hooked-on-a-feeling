import BasicSprite from "../../assets/BasicSprite.png";
import BasicRed from "../../assets/Red/BasicRed.png";
import BasicGreen from "../../assets/Green/BasicGreen.png";
import BasicBlue from "../../assets/Blue/BasicBlue.png";
import BasicOrange from "../../assets/Orange/BasicOrange.png";

import { useAuth } from "../../contexts";

const ProfileCard = () => {
    const { userData } = useAuth();
  
    const getSpritePath = (color, xp) => {
      switch (color) {
        case 'orange':
          if (xp < 10) return BasicOrange;
          if (xp < 20) return MediumOrange;
          return LegendaryOrange;
        case 'green':
          if (xp < 10) return BasicGreen;
          if (xp < 20) return MediumGreen;
          return LegendaryGreen;
        case 'red':
          if (xp < 10) return BasicRed;
          if (xp < 20) return MediumRed;
          return LegendaryRed;
        case 'blue':
          if (xp < 10) return BasicBlue;
          if (xp < 20) return MediumBlue;
          return LegendaryBlue;
        default:
          return BasicSprite; // Default path if color is not matched
      }
    };
    const spritePath = getSpritePath(userData.favcolor, userData.generalxp);

  
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
        <p>General XP: {userData.generalxp}</p>
        <p>English XP: {userData.subjectxpenglish}</p>
      </div>
      <div className="right-half">
        <p>Maths XP: {userData.subjectxpmaths}</p>
        <p>Science XP: {userData.subjectxpscience}</p>
      </div>
    </div>
  </div>
  );
};

export default ProfileCard;
