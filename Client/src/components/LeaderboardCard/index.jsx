import React, {useState, useEffect} from "react";
import {useAuth} from "../../contexts";
import getSpritePath from "../Sprites";

export default function LeaderboardCard({ username, generalxp, favcolor }) {

    return (
        <>
            <div className="leaderboard-entry">
                <span className="leaderboard-position">#</span>
                <span className="leaderboard-sprite"><img className="leaderSprite" src={getSpritePath({favcolor}, {generalxp})}/></span>
                <span className="leaderboard-username">{username}</span>
                <span>XP: {generalxp}</span>
            </div>
        </>
    )
}
