import React, {useState, useEffect} from "react";
import {useAuth} from "../../contexts";

export default function LeaderboardCard({ username, generalXp }) {
    return (
        <>
            <div className="leaderboard-entry">
                <span className="leaderboard-position">#</span>
                <span className="leaderboard-sprite">Sprite</span>
                <span className="leaderboard-username">{username}</span>
                <span>XP: {generalXp}</span>
            </div>
        </>
    )
}