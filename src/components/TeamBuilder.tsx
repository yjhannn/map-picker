// src/components/TeamBuilder.tsx
import { useState } from 'react';

const members = ['김준호', '김윤관', '나은빈', '도현우', '송준규', '임채연', '허고은', '한영진', '박신영'];

const teamColors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
  '#FFEAA7', '#74B9FF', '#FD79A8', '#55EFC4'
];

interface TeamBuilderProps {
  onBack: () => void;
}

export default function TeamBuilder({ onBack }: TeamBuilderProps) {
  const [teamSize, setTeamSize] = useState<2 | 3 | 4 | null>(null);
  const [teams, setTeams] = useState<string[][]>([]);
  const [isBuilding, setIsBuilding] = useState(false);

  const shuffleArray = (array: string[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const buildTeams = (size: 2 | 3 | 4) => {
    setIsBuilding(true);
    setTeamSize(size);
    setTeams([]);

    setTimeout(() => {
      const shuffled = shuffleArray(members);
      const newTeams: string[][] = [];
      
      if (size === 2) {
        // 2명씩: 3-2-2-2 (첫 팀만 3명)
        newTeams.push(shuffled.slice(0, 3));
        newTeams.push(shuffled.slice(3, 5));
        newTeams.push(shuffled.slice(5, 7));
        newTeams.push(shuffled.slice(7, 9));
      } else if (size === 3) {
        // 3명씩: 3-3-3
        newTeams.push(shuffled.slice(0, 3));
        newTeams.push(shuffled.slice(3, 6));
        newTeams.push(shuffled.slice(6, 9));
      } else if (size === 4) {
        // 4명씩: 5-4 (첫 팀만 5명)
        newTeams.push(shuffled.slice(0, 5));
        newTeams.push(shuffled.slice(5, 9));
      }
      
      setTeams(newTeams);
      setIsBuilding(false);
    }, 1500);
  };

  return (
    <div className="container">
      <div className="card">
        <button className="back-button" onClick={onBack}>
          ← 뒤로가기
        </button>
        
        <h1 className="title">👥 팀 빌딩</h1>
        <p className="subtitle">팀원을 랜덤으로 나눠보세요!</p>
        <p className="region-count">총 {members.length}명</p>

        <div className="team-size-selector">
          <button
            className={`team-size-button ${teamSize === 2 ? 'active' : ''}`}
            onClick={() => buildTeams(2)}
            disabled={isBuilding}
          >
            2인(4팀)
          </button>
          <button
            className={`team-size-button ${teamSize === 3 ? 'active' : ''}`}
            onClick={() => buildTeams(3)}
            disabled={isBuilding}
          >
            3인
          </button>
          <button
            className={`team-size-button ${teamSize === 4 ? 'active' : ''}`}
            onClick={() => buildTeams(4)}
            disabled={isBuilding}
          >
            4인(2팀)
          </button>
        </div>

        {isBuilding && (
          <div className="building-animation">
            <div className="spinner">🔄</div>
            <p>팀을 구성하는 중...</p>
          </div>
        )}

        {!isBuilding && teams.length > 0 && (
          <div className="teams-container">
            {teams.map((team, index) => (
              <div 
                key={index} 
                className="team-card"
                style={{ borderColor: teamColors[index] }}
              >
                <h3 style={{ color: teamColors[index] }}>
                  팀 {index + 1}
                </h3>
                <div className="team-members">
                  {team.map((member, idx) => (
                    <div key={idx} className="member-tag">
                      {member}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {!isBuilding && teams.length === 0 && (
          <div className="empty-state">
            <p>👆 위에서 팀 인원을 선택해주세요!</p>
          </div>
        )}
      </div>
    </div>
  );
}