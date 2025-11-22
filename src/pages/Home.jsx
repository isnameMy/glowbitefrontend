import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home-container">


      <h1 className="home-title">🔥 Уголь-Монитор</h1>
      <p className="home-description">
        Прогноз самовозгорания угля при открытом хранении
      </p>
      <Link
        to="/dashboard"
        className="btn btn-primary"
      >
        Начать работу
      </Link>
    </div>
  );
}