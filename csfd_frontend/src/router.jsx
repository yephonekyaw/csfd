import { createBrowserRouter } from 'react-router-dom';
import SignInPage from './pages/SignInPage.jsx';
import HomePage from './pages/HomePage.jsx';
import AlphaHouse from './pages/AlphaHouse.jsx';
import EpsilonHouse from './pages/EpsilonHouse.jsx';
import EtaHouse from './pages/EtaHouse.jsx';
import IotaHouse from './pages/IotaHouse.jsx';
import HintsPage from './pages/HintsPage.jsx';
import GuessPage from './pages/GuessPage.jsx';
import App from './App.jsx';
import NotFound from './pages/NotFound.jsx';

const router = createBrowserRouter([
  {
    path: '/signin',
    element: <SignInPage />,
  },
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: 'hints',
        element: <HintsPage />,
      },
      {
        path: 'guess',
        element: <GuessPage />,
      },
      {
        path: 'house/alpha',
        element: <AlphaHouse />,
      },
      {
        path: 'house/epsilon',
        element: <EpsilonHouse />,
      },
      {
        path: '/house/eta',
        element: <EtaHouse />,
      },
      {
        path: '/house/iota',
        element: <IotaHouse />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
