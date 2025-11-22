import { createBrowserRouter } from 'react-router-dom';
import App from './app/App';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import StackDetail from './pages/StackDetail';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'stack/:warehouse/:stack', element: <StackDetail /> },
    ],
  },
]);