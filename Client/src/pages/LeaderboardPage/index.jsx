import React, {useState, useEffect } from 'react';
import { useAuth } from '../../contexts';
import { LeaderboardCard } from '../../components';

export default function LeaderboardPage() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadLeaderboard = async () => {
      const response = await fetch(`https://project-3-backend-l4m5.onrender.com/users`);
      const data = await response.json();
      setUsers(data);
    };

    loadLeaderboard();
  }, []);

  const sortedUsers = users.slice().sort((a, b) => b.generalXp - a.generalXp);

  const topUsers = sortedUsers.slice(0, 4);
  console.log(topUsers);

  const leaders = topUsers.map((user, i) => {
    return (
      <LeaderboardCard key={user.id} index={i} {...user} />
    )
  })

  return (
    <>
      <div className="leaderboard-page">
        <div className="leaderboard-container">
          <h1 className="leaderboard-heading">Leaderboard</h1>
          <div>
            {leaders}
          </div>
        </div>
      </div>
    </>
  )
}
