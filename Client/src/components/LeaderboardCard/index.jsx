import React, {useState, useEffect} from "react";
import {useAuth} from "../../contexts";
import getSpritePath from "../Sprites";


export default function LeaderboardCard({ username, generalxp, favcolor, index }) {
    const spritePath = getSpritePath(favcolor.toLowerCase(), generalxp);

    return (
        <>
            <div className="leaderboard-entry">
                <span className="leaderboard-position">#{index + 1}</span>
                <span className="leaderboard-sprite"><img className="leaderSprite" src={getSpritePath(favcolor, subjectXp)}/></span>
                <span className="leaderboard-username">{username}</span>
                <span>XP: {subjectXp}</span>
            </div>
        </>
    )
}
