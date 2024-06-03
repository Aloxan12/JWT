import { Route, Routes } from 'react-router-dom';
import { MainLayoutRoutes } from './MainLayoutRoutes';
import { LoginPage } from '../../../pages/Login';
import { Suspense } from 'react';
import { allRoutePaths } from './routerPaths';
import { RegistrationPage } from '../../../pages/Registration';

export const NotAuthRoutes = () => {
  return (
    <Suspense fallback={''}>
      <Routes>
        <Route path={'/'} element={<MainLayoutRoutes />} />
        <Route path={allRoutePaths.login.path} element={<LoginPage />} />
        <Route path={allRoutePaths.registration.path} element={<RegistrationPage />} />
      </Routes>
    </Suspense>
  );
};
