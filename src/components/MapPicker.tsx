// src/components/MapPicker.tsx
import { useState, useEffect } from 'react';

interface Region {
  id: number;
  name: string;
  x: number;
  y: number;
  color: string;
}

const regions: Region[] = [
  { id: 1, name: '포항시', x: 78, y: 32, color: '#FF6B6B' },
  { id: 2, name: '경주시', x: 70, y: 40, color: '#4ECDC4' },
  { id: 3, name: '안동시', x: 50, y: 28, color: '#45B7D1' },
  { id: 4, name: '구미시', x: 45, y: 42, color: '#96CEB4' },
  { id: 5, name: '영주시', x: 38, y: 22, color: '#FFEAA7' },
  { id: 6, name: '영천시', x: 65, y: 45, color: '#DFE6E9' },
  { id: 7, name: '상주시', x: 35, y: 35, color: '#74B9FF' },
  { id: 8, name: '문경시', x: 28, y: 32, color: '#A29BFE' },
  { id: 9, name: '경산시', x: 62, y: 52, color: '#FD79A8' },
  { id: 10, name: '김천시', x: 38, y: 46, color: '#55EFC4' },
  { id: 11, name: '의성군', x: 55, y: 35, color: '#FDA7DF' },
  { id: 12, name: '청송군', x: 62, y: 30, color: '#B8E994' },
  { id: 13, name: '영양군', x: 58, y: 25, color: '#C7ECEE' },
  { id: 14, name: '영덕군', x: 72, y: 28, color: '#BADC58' },
  { id: 15, name: '청도군', x: 58, y: 50, color: '#F8B195' },
  { id: 16, name: '고령군', x: 50, y: 50, color: '#C44569' },
  { id: 17, name: '성주군', x: 45, y: 50, color: '#F3A683' },
  { id: 18, name: '칠곡군', x: 52, y: 48, color: '#786FA6' },
  { id: 19, name: '예천군', x: 42, y: 30, color: '#F8EFBA' },
  { id: 20, name: '봉화군', x: 52, y: 20, color: '#63CDDA' },
  { id: 21, name: '울진군', x: 68, y: 18, color: '#546DE5' },
  { id: 22, name: '울릉군', x: 88, y: 22, color: '#574B90' },
  { id: 23, name: '대구광역시', x: 55, y: 50, color: '#FF7675' },
  { id: 24, name: '울산광역시', x: 78, y: 58, color: '#6C5CE7' },
  { id: 25, name: '창원시', x: 42, y: 72, color: '#00B894' },
  { id: 26, name: '진주시', x: 30, y: 70, color: '#E17055' },
  { id: 27, name: '통영시', x: 42, y: 82, color: '#55EFC4' },
  { id: 28, name: '사천시', x: 32, y: 78, color: '#A29BFE' },
  { id: 29, name: '김해시', x: 52, y: 68, color: '#FDCB6E' },
  { id: 30, name: '밀양시', x: 56, y: 62, color: '#FD79A8' },
  { id: 31, name: '거제시', x: 52, y: 85, color: '#B2BEC3' },
  { id: 32, name: '양산시', x: 65, y: 65, color: '#00CEC9' },
  { id: 33, name: '의령군', x: 38, y: 68, color: '#FD79A8' },
  { id: 34, name: '함안군', x: 45, y: 65, color: '#FDCB6E' },
  { id: 35, name: '창녕군', x: 50, y: 60, color: '#E17055' },
  { id: 36, name: '고성군', x: 48, y: 80, color: '#00B894' },
  { id: 37, name: '남해군', x: 35, y: 85, color: '#0984E3' },
  { id: 38, name: '하동군', x: 26, y: 76, color: '#6C5CE7' },
  { id: 39, name: '산청군', x: 32, y: 65, color: '#A29BFE' },
  { id: 40, name: '함양군', x: 28, y: 58, color: '#74B9FF' },
  { id: 41, name: '거창군', x: 28, y: 52, color: '#55EFC4' },
  { id: 42, name: '합천군', x: 38, y: 55, color: '#FFEAA7' },
  { id: 43, name: '부산광역시', x: 70, y: 72, color: '#0984E3' },
];

interface MapPickerProps {
  onBack: () => void;
}

export default function MapPicker({ onBack }: MapPickerProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [highlightedId, setHighlightedId] = useState<number | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [spinSpeed, setSpinSpeed] = useState(50);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isSpinning) {
      interval = setInterval(() => {
        const randomId = Math.floor(Math.random() * regions.length) + 1;
        setHighlightedId(randomId);
      }, spinSpeed);
    }

    return () => clearInterval(interval);
  }, [isSpinning, spinSpeed]);

  const handleSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setSelectedRegion(null);
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
      setIsSpinning(false);
      const finalRegion = regions[Math.floor(Math.random() * regions.length)];
      setHighlightedId(finalRegion.id);
      setSelectedRegion(finalRegion);
      clearInterval(slowDown);
    }, 3000);
  };

  return (
    <div className="container">
      <div className="card">
        <button className="back-button" onClick={onBack}>
          ← 뒤로가기
        </button>
        
        <h1 className="title">🗺️ 경상도 지도 찍기</h1>
        <p className="subtitle">버튼을 눌러 랜덤으로 여행지를 선택해보세요!</p>
        <p className="region-count">총 {regions.length}개 지역</p>

        <div className="map-container">
          <svg className="map-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            <path
              d="M 22,18 L 35,15 L 50,15 L 65,16 L 75,20 L 85,28 L 90,38 L 88,48 L 82,58 L 75,66 L 68,74 L 58,82 L 48,87 L 38,88 L 30,86 L 24,80 L 20,72 L 18,62 L 20,52 L 22,42 L 22,30 L 22,20 Z"
              fill="rgba(255,255,255,0.3)"
              stroke="#64748b"
              strokeWidth="0.5"
            />

            {regions.map((region) => (
              <g key={region.id}>
                <circle
                  cx={region.x}
                  cy={region.y}
                  r={highlightedId === region.id ? '3.5' : '2'}
                  fill={highlightedId === region.id ? region.color : '#64748b'}
                  className="region-dot"
                  style={{
                    filter: highlightedId === region.id ? 'drop-shadow(0 0 10px rgba(0,0,0,0.3))' : 'none'
                  }}
                />
                {highlightedId === region.id && (
                  <>
                    <circle
                      cx={region.x}
                      cy={region.y}
                      r="5"
                      fill="none"
                      stroke={region.color}
                      strokeWidth="0.5"
                      opacity="0.6"
                    >
                      <animate
                        attributeName="r"
                        from="3.5"
                        to="7"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        from="0.8"
                        to="0"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <text
                      x={region.x}
                      y={region.y - 5}
                      textAnchor="middle"
                      className="region-label"
                      fill="#1e293b"
                    >
                      {region.name}
                    </text>
                  </>
                )}
              </g>
            ))}
          </svg>
        </div>

        <div className="button-container">
          <button
            onClick={handleSpin}
            disabled={isSpinning}
            className={`spin-button ${isSpinning ? 'disabled' : ''}`}
          >
            {isSpinning ? '🎲 선택 중...' : '🎯 지도 찍기!'}
          </button>

          {selectedRegion && !isSpinning && (
            <div className="result-card">
              <p className="result-title">🎉 선택된 지역 🎉</p>
              <p className="result-name" style={{ color: selectedRegion.color }}>
                {selectedRegion.name}
              </p>
              <p className="result-subtitle">즐거운 여행 되세요! ✈️</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}