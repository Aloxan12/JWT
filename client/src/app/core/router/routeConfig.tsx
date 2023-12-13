import {
  AppRoutes,
  getRouteBlankSheet,
  getRouteCurrentUser,
  getRouteLogin,
  getRouteMain,
  getRouteProjects,
  getRouteRegistration,
  getRouteUiKit,
  getRouteUserDetail,
  getRouteUsers,
} from './routerPaths';
import MainPage from '../../../Pages/MainPage';
import { Users } from '../../../Pages/Users/Users';
import { RouteProps } from 'react-router-dom';
import { UserProfile } from '../../../Pages/Users/UserProfile';
import { NotFound } from '../../../Pages/NotFound/NotFound';
import { UiKit } from '../../../Pages/UIKit/UIKit';
import { BlankSheet } from '../../../Pages/BlankSheet/BlankSheet';
import { ProjectsPage } from '../../../Pages/ProjectsPage/ProjectsPage';
import { Login } from '../../../Pages/Login/Login';
import { Registration } from '../../../Pages/Registration/Registration';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
  roles?: UserRole[];
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    element: <MainPage />,
    authOnly: true,
  },
  [AppRoutes.USERS]: {
    path: getRouteUsers(),
    element: <Users />,
    authOnly: true,
  },
  [AppRoutes.CURRENT_USER]: {
    path: getRouteCurrentUser(),
    element: <UserProfile />,
    authOnly: true,
  },
  [AppRoutes.USERS_DETAIL]: {
    path: getRouteUserDetail(':id'),
    element: <UserProfile />,
    authOnly: true,
  },
  [AppRoutes.UI_KIT]: {
    path: getRouteUiKit(),
    element: <UiKit />,
    authOnly: true,
  },
  [AppRoutes.BLANK_SHEET]: {
    path: getRouteBlankSheet(),
    element: <BlankSheet />,
    authOnly: true,
  },
  [AppRoutes.PROJECTS]: {
    path: getRouteProjects(),
    element: <ProjectsPage />,
    authOnly: true,
  },

  [AppRoutes.LOGIN]: {
    path: getRouteLogin(),
    element: <Login />,
  },
  [AppRoutes.REGISTRATION]: {
    path: getRouteRegistration(),
    element: <Registration />,
  },
  // last
  [AppRoutes.NOT_FOUND]: {
    path: '*',
    element: <NotFound />,
  },
};
