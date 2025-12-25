// src/components/MainMenu.tsx
interface MainMenuProps {
  onNavigate: (page: 'map' | 'team' | 'lucky') => void;
}

export default function MainMenu({ onNavigate }: MainMenuProps) {
  return (
    <div className="container">
      <div className="main-card">
        <div className="team-photo">
          <img 
            src="/team-photo.jpg" 
            alt="우리 모임" 
            className="team-image"
          />
        </div>
        <h1 className="main-title">🎮 놀이터</h1>
        <p className="main-subtitle">원하는 게임을 선택해보세요!</p>

        <div className="menu-grid">
          <button className="menu-button map-button" onClick={() => onNavigate('map')}>
            <div className="menu-icon">🗺️</div>
            <div className="menu-text">
              <h2>지도 찍기</h2>
              <p>경상도 랜덤 여행지</p>
            </div>
          </button>

          <button className="menu-button team-button" onClick={() => onNavigate('team')}>
            <div className="menu-icon">👥</div>
            <div className="menu-text">
              <h2>팀 빌딩</h2>
              <p>랜덤 팀 나누기</p>
            </div>
          </button>

          <button className="menu-button lucky-button" onClick={() => onNavigate('lucky')}>
            <div className="menu-icon">🎲</div>
            <div className="menu-text">
              <h2>복불복</h2>
              <p>행운의 주인공은?</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}