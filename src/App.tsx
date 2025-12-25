import { useState } from 'react';
import './App.css';
import MainMenu from './components/MainMenu.tsx';
import MapPicker from './components/MapPicker.tsx';
import TeamBuilder from './components/TeamBuilder.tsx';
import LuckyDraw from './components/LuckyDraw.tsx';

type Page = 'main' | 'map' | 'team' | 'lucky';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('main');

  const renderPage = () => {
    switch (currentPage) {
      case 'main':
        return <MainMenu onNavigate={setCurrentPage} />;
      case 'map':
        return <MapPicker onBack={() => setCurrentPage('main')} />;
      case 'team':
        return <TeamBuilder onBack={() => setCurrentPage('main')} />;
      case 'lucky':
        return <LuckyDraw onBack={() => setCurrentPage('main')} />;
      default:
        return <MainMenu onNavigate={setCurrentPage} />;
    }
  };

  return <div className="app">{renderPage()}</div>;
}

export default App;