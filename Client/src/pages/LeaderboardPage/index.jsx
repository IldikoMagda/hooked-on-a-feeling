import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts';
import { LeaderboardCard } from '../../components';

export default function LeaderboardPage() {
  const [users, setUsers] = useState([]);
  const [filterType, setFilterType] = useState('generalxp'); 
  const [sortedUsers, setSortedUsers] = useState([]);

  useEffect(() => {
    const loadLeaderboard = async () => {
      const response = await fetch(`https://project-3-backend-l4m5.onrender.com/users`);
      const data = await response.json();
      setUsers(data);
    };
    loadLeaderboard();
  }, [filterType]);

  
  useEffect(() => {
    // Sort users based on the selected filter type
    const sorted = users.slice().sort((a, b) => b[filterType.toLowerCase()] - a[filterType.toLowerCase()]);
    setSortedUsers(sorted);
  }, [filterType, users]);

  const handleFilterChange = (newFilterType) => {
    setFilterType(newFilterType);
  };
  const leaders = sortedUsers.map((user, i) => {
    return (
      <LeaderboardCard key={i} index={i} subjectXp={user[filterType.toLowerCase()]} generalXp={user.generalxp} {...user} />
    );
  });
  return (
    <>
      <div className="leaderboard-page">
        <div className="leaderboard-container">
          <h1 className="leaderboard-heading">Leaderboard</h1>
          <div>
            <div>
              <label>
                <input
                  type="radio"
                  value="generalxp"
                  checked={filterType === 'generalxp'}
                  onChange={() => handleFilterChange('generalxp')}
                />
                General XP
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="Maths"
                  checked={filterType === 'subjectxpmaths'}
                  onChange={() => handleFilterChange('subjectxpmaths')}
                />
                Maths XP
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="Science"
                  checked={filterType === 'subjectxpscience'}
                  onChange={() => handleFilterChange('subjectxpscience')}
                />
                Science XP
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="English"
                  checked={filterType === 'subjectxpenglish'}
                  onChange={() => handleFilterChange('subjectxpenglish')}
                />
                English XP
              </label>
            </div>
          </div>

          <div>
            {leaders}
          </div>
        </div>
      </div>
    </>
  );
}
