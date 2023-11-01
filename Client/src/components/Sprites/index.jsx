import BasicSprite from "../../assets/BasicSprite.png";
import BasicRed from "../../assets/Red/BasicRed.png";
import MediumRed from "../../assets/Red/MediumRed.png"
import LegendaryRed from "../../assets/Red/LegendaryRed.png"
import BasicGreen from "../../assets/Green/BasicGreen.png";
import MediumGreen from "../../assets/Green/MediumGreen.png"
import LegendaryGreen from "../../assets/Green/LegendaryGreen.png"
import BasicBlue from "../../assets/Blue/BasicBlue.png";
import MediumBlue from "../../assets/Blue/MediumBlue.png"
import LegendaryBlue from "../../assets/Blue/LegendaryBlue.png"
import BasicOrange from "../../assets/Orange/BasicOrange.png";
import MediumOrange from "../../assets/Orange/MediumOrange.png"
import LegendaryOrange from "../../assets/Orange/LegendaryOrange.png"

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
export default getSpritePath;
