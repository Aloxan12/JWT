import App from '../App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Registration } from '../Pages/Registration/Registration';
import { Header } from '../Pages/Header/Header';
import { ToastContainer } from 'react-toastify';
import React from 'react';
import { Login } from '../Pages/Login/Login';
import { ComponentsShow } from '../Pages/ComponentsShow/ComponentsShow';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { NotFound } from '../Pages/NotFound/NotFound';
import { Users } from '../Pages/Users/Users';
import { PersonalAccount } from '../Pages/PersonalAccount/PersonalAccount';
import { UserProfile } from '../Pages/Users/UserProfile';
import { IUser } from '../redux/api/dto/UserDto';
import { ProjectsPage } from '../Pages/ProjectsPage/ProjectsPage';
import { BlankSheet } from '../Pages/BlankSheet/BlankSheet';
import '../styles/global.scss';
import { MainLayout } from '../Pages/MainLayout/MainLayout';
import { BootstrapCustomNetPage } from '../Pages/BootstrapCustomNetPage/BootstrapCustomNetPage';

export const routesIsNotAuth = [
  {
    id: 'Registration',
    path: '/registration',
    // exact: true,
    component: <Registration />,
  },
  {
    id: 'Login',
    path: '/login',
    // exact: true,
    component: <Login />,
  },
  {
    id: 'Loader',
    path: '*',
    // exact: true,
    component: <Login />,
  },
];

type RoutesForMenuType = {
  [key in RoleTypes]: IRouteObj[];
};

export enum RoleTypes {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface IRouteObj {
  id: string;
  title: string;
  path: string;
  showInMenu: boolean;
  component: JSX.Element;
}

const uniqRoutesByRole = {
  [RoleTypes.ADMIN]: [
    {
      id: 'UserProfile',
      path: '/users/:id',
      title: 'Пользователь',
      showInMenu: false,
      component: <UserProfile />,
    },
    {
      id: 'ProjectsPage',
      path: '/projects',
      title: 'Мои проекты',
      showInMenu: true,
      component: <ProjectsPage />,
    },
  ],
  [RoleTypes.USER]: [
    {
      id: 'Main',
      path: '/',
      title: 'Главная',
      showInMenu: true,
      component: <App />,
    },
    {
      id: 'PersonalAccount',
      path: '/currentUser/:id',
      title: 'Личный кабинет',
      showInMenu: false,
      component: <PersonalAccount />,
    },
    {
      id: 'ComponentsShow',
      path: '/componentsShow',
      title: 'Компоненты',
      showInMenu: true,
      component: <ComponentsShow />,
    },
    {
      id: 'BlankSheet',
      path: '/blank-sheet',
      title: 'Чистый лист',
      showInMenu: true,
      component: <BlankSheet />,
    },
    {
      id: 'Users',
      path: '/users',
      title: 'Пользователи',
      showInMenu: true,
      component: <Users />,
    },
    {
      id: 'Bootstrap',
      path: '/bootstrap-net',
      title: 'Сетка',
      showInMenu: true,
      component: <BootstrapCustomNetPage />,
    },
    {
      id: 'NotFound',
      path: '*',
      // exact: true,
      title: 'Не найдена',
      showInMenu: false,
      component: <NotFound />,
    },
  ],
};
export const routesByRole: RoutesForMenuType = {
  [RoleTypes.ADMIN]: [...uniqRoutesByRole[RoleTypes.USER], ...uniqRoutesByRole[RoleTypes.ADMIN]],
  [RoleTypes.USER]: uniqRoutesByRole[RoleTypes.USER],
};

export const AppRoutes = () => {
  const isAuth = useSelector<RootState, boolean>((state) => state.auth.isAuth);
  const user = useSelector<RootState, IUser | null>((state) => state.auth.authData.user);

  return (
    <BrowserRouter>
      <Header itemsRoute={user ? routesByRole[user.role] : []} />
      <ToastContainer />
      <MainLayout>
        <Routes>
          {isAuth
            ? user
              ? routesByRole[user.role].map((route) => {
                  const { id, component, path } = route;
                  return <Route key={id} path={path} element={component} />;
                })
              : []
            : routesIsNotAuth.map((route) => {
                const { id, component, path } = route;
                return <Route key={id} path={path} element={component} />;
              })}
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};
