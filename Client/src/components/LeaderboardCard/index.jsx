import React, {useState, useEffect} from "react";
import {useAuth} from "../../contexts";
import getSpritePath from "../Sprites";


export default function LeaderboardCard({ username, subjectXp, favcolor, index,generalXp }) {
    const spritePath = getSpritePath(favcolor.toLowerCase(), generalXp);

    return (
        <>
            <div className="leaderboard-entry">
                <span className="leaderboard-position">#{index + 1}</span>
                <span className="leaderboard-sprite"><img className="leaderSprite" src={spritePath}/></span>
                <span className="leaderboard-username">{username}</span>
                <span>XP: {subjectXp}</span>
            </div>
        </>
    )
}
