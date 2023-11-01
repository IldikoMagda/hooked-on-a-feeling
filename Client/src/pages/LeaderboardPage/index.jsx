import React, {useState, useEffect } from 'react';
import { useAuth } from '../../contexts';
import { LeaderboardCard } from '../../components';

export default function LeaderboardPage() {

  //we have maths english and science and general xp  

  const [users, setUsers] = useState([]);
  const [generalOnly, setGeneralOnly] = useState(true);
  const [mathsOnly, setMathsOnly] = useState(false);
  const [scienceOnly, setScienceOnly] = useState(false);
  const [englishOnly, setEnglishOnly] = useState(false);


  useEffect(() => {
    const loadLeaderboard = async () => {
      const response = await fetch(`https://project-3-backend-l4m5.onrender.com/users`);
      const data = await response.json();
      const sortedUsers = data.slice().sort((a, b) => b.generalxp - a.generalxp);
      console.log(users)
      const topUsers = sortedUsers.slice(0, 10);
      // console.log(topUsers);
      setUsers(topUsers);
    };

    loadLeaderboard();
  }, []);

  const leaders = users.map((user,i) => {
    return (
      <LeaderboardCard key={user.user_id} index={i} {...user} />
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
