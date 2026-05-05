// src/components/DriverPicker.tsx
import { useState, useEffect } from 'react';

const cars = [
  { name: '영차', emoji: '🚗', color: '#FF6B6B' },
  { name: '도카', emoji: '🚙', color: '#4ECDC4' },
  { name: '빈차', emoji: '🚕', color: '#45B7D1' },
  { name: '관카', emoji: '🚐', color: '#96CEB4' }
];

interface DriverPickerProps {
  onBack: () => void;
}

export default function DriverPicker({ onBack }: DriverPickerProps) {
  const [carCount, setCarCount] = useState<number>(1);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentHighlight, setCurrentHighlight] = useState<string[]>([]);
  const [selectedCars, setSelectedCars] = useState<typeof cars>([]);
  const [spinSpeed, setSpinSpeed] = useState(50);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isDrawing) {
      interval = setInterval(() => {
        const shuffled = [...cars].sort(() => Math.random() - 0.5);
        setCurrentHighlight(shuffled.slice(0, carCount).map(c => c.name));
      }, spinSpeed);
    }

    return () => clearInterval(interval);
  }, [isDrawing, spinSpeed, carCount]);

  const handleDraw = () => {
    if (isDrawing) return;
    
    setIsDrawing(true);
    setSelectedCars([]);
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
      const shuffled = [...cars].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, carCount);
      setSelectedCars(selected);
      setCurrentHighlight(selected.map(c => c.name));
      clearInterval(slowDown);
    }, 3000);
  };

  return (
    <div className="container">
      <div className="card">
        <button className="back-button" onClick={onBack}>
          ← 뒤로가기
        </button>
        
        <h1 className="title">🚗 운전자 뽑기</h1>
        <p className="subtitle">오늘의 기사님을 선택해보세요!</p>

        <div className="driver-count-selector">
          <label htmlFor="car-count">차량 대수:</label>
          <div className="count-buttons">
            {[1, 2, 3, 4].map(num => (
              <button
                key={num}
                className={`count-button ${carCount === num ? 'active' : ''}`}
                onClick={() => setCarCount(num)}
                disabled={isDrawing}
              >
                {num}대
              </button>
            ))}
          </div>
        </div>

        <div className="cars-grid">
          {cars.map((car) => {
            const isHighlighted = currentHighlight.includes(car.name);
            const isSelected = selectedCars.some(c => c.name === car.name);
            
            return (
              <div
                key={car.name}
                className={`car-card ${isHighlighted ? 'highlight' : ''} ${isSelected && !isDrawing ? 'selected' : ''}`}
                style={{
                  borderColor: isHighlighted || isSelected ? car.color : '#e5e7eb',
                  backgroundColor: isSelected && !isDrawing ? `${car.color}15` : 'white'
                }}
              >
                <div className="car-emoji">{car.emoji}</div>
                <div className="car-name" style={{ color: isHighlighted || isSelected ? car.color : '#374151' }}>
                  {car.name}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleDraw}
          disabled={isDrawing}
          className={`spin-button ${isDrawing ? 'disabled' : ''}`}
        >
          {isDrawing ? '🎲 추첨 중...' : '🎯 운전자 뽑기!'}
        </button>

        {selectedCars.length > 0 && !isDrawing && (
          <div className="result-card driver-result">
            <p className="result-title">🎊 선택된 차량 🎊</p>
            <div className="selected-cars-list">
              {selectedCars.map((car, index) => (
                <div key={index} className="selected-car-item" style={{ color: car.color }}>
                  {car.emoji} {car.name}
                </div>
              ))}
            </div>
            <p className="result-subtitle">안전운전 하세요! 🚗💨</p>
          </div>
        )}
      </div>
    </div>
  );
}