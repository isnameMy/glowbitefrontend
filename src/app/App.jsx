import { Outlet, Link, useLocation } from 'react-router-dom';
import '/src/App.css'; // ← подключаем CSS

export default function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="app">
      {!isHome && (
        <header className="header">
          <div className="container-header-content">
            <Link to="/" className="logo">
              🔥 <span>Уголь-Монитор</span>
            </Link>
            <nav>
              <Link
                to="/dashboard"
                className="nav-link"
              >
                Дашборд
              </Link>
            </nav>
          </div>
        </header>
      )}

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        Прогноз самовозгорания угля • Хакатон 2025
      </footer>
    </div>
  );
}