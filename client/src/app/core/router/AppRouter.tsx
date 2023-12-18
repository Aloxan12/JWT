import { useAppSelector } from '../redux/store';
import { Navigate, useLocation, useMatch } from 'react-router-dom';
import React from 'react';
import '../../../styles/global.scss';
import { NotAuthRoutes } from './NotAuthRoutes';
import { MainLayoutRoutes } from './MainLayoutRoutes';

export enum RoleTypes {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface IRouteObj {
  id: string;
  path: string;
  component: JSX.Element;
}

interface IRedirect {
  path?: string;
}

export const AppRedirect = ({ path = '/' }: IRedirect) => {
  const location = useLocation();
  return <Navigate to={path} state={{ from: location }} replace />;
};

const RequireAuth = ({
  children,
  routesWithAuth,
}: {
  children: JSX.Element;
  routesWithAuth: JSX.Element;
}) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuth);
  const isInit = useAppSelector((state) => state.auth.rehydrated);
  const isSameUrl = !!useMatch('login');
  const isSameUrlTwo = !!useMatch('registration');

  if (!isInit) {
    return null;
  }

  if (!isAuthenticated) {
    return isSameUrl || isSameUrlTwo ? children : <AppRedirect path={'/login'} />;
  }

  return routesWithAuth;
};

export const AppRouter = () => {
  return (
    <RequireAuth routesWithAuth={<MainLayoutRoutes />}>
      <NotAuthRoutes />
    </RequireAuth>
  );
};
