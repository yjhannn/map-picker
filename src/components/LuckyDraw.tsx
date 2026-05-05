// src/components/LuckyDraw.tsx
import { useState, useEffect } from 'react';

const members = ['김준호', '김윤관', '나은빈', '도현우', '박신영', '송준규', '임채연', '허고은', '한영진'];

interface LuckyDrawProps {
  onBack: () => void;
}

export default function LuckyDraw({ onBack }: LuckyDrawProps) {
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentName, setCurrentName] = useState('');
  const [winner, setWinner] = useState('');
  const [spinSpeed, setSpinSpeed] = useState(50);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isDrawing) {
      interval = setInterval(() => {
        const randomMember = members[Math.floor(Math.random() * members.length)];
        setCurrentName(randomMember);
      }, spinSpeed);
    }

    return () => clearInterval(interval);
  }, [isDrawing, spinSpeed]);

  const startDraw = () => {
    if (isDrawing) return;
    
    setIsDrawing(true);
    setWinner('');
    setSpinSpeed(50);

    const slowDown = setInterval(() => {
      setSpinSpeed(prev => {
        if (prev >= 300) {
          clearInterval(slowDown);
          return prev;
        }
        return prev + 20;
      });
    }, 200);

    setTimeout(() => {
      setIsDrawing(false);
      const luckyWinner = members[Math.floor(Math.random() * members.length)];
      setCurrentName(luckyWinner);
      setWinner(luckyWinner);
      clearInterval(slowDown);
    }, 3000);
  };

  return (
    <div className="container">
      <div className="card">
        <button className="back-button" onClick={onBack}>
          ← 뒤로가기
        </button>
        
        <h1 className="title">🎲 복불복</h1>
        <p className="subtitle">행운의 주인공을 뽑아보세요!</p>
        <p className="region-count">총 {members.length}명 참여</p>

        <div className="lucky-draw-container">
          <div className="members-grid">
            {members.map((member, index) => (
              <div
                key={index}
                className={`member-card ${currentName === member ? 'highlight' : ''} ${winner === member ? 'winner' : ''}`}
              >
                {member}
              </div>
            ))}
          </div>

          <button
            onClick={startDraw}
            disabled={isDrawing}
            className={`spin-button ${isDrawing ? 'disabled' : ''}`}
          >
            {isDrawing ? '🎲 추첨 중...' : '🎯 복불복 시작!'}
          </button>

          {winner && !isDrawing && (
            <div className="result-card winner-card">
              <p className="result-title">🎊 당첨자 🎊</p>
              <p className="result-name winner-name">
                {winner}
              </p>
              <p className="result-subtitle">축하합니다! 🎉</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}