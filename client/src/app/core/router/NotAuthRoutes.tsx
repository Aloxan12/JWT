import { Route, Routes } from 'react-router-dom';
import { MainLayoutRoutes } from './MainLayoutRoutes';
import { Registration } from '../../../Pages/Registration/Registration';
import { Login } from '../../../Pages/Login/Login';

export const NotAuthRoutes = () => {
  return (
    <Routes>
      <Route path={'/'} element={<MainLayoutRoutes />} />
      <Route path={'/login'} element={<Login />} />
      <Route path={'/registration'} element={<Registration />} />
    </Routes>
  );
};
