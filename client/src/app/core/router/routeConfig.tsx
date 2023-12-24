import {
  allRoutePaths,
  getRouteBlankSheet,
  getRouteCurrentUser,
  getRouteForbidden,
  getRouteProjects,
  getRouteUiKit,
  getRouteUserDetail,
  getRouteUsers,
} from './routerPaths';
import { Users } from '../../../Pages/Users/Users';
import { UserProfile } from '../../../Pages/Users/UserProfile';
import { NotFound } from '../../../Pages/NotFound/NotFound';
import { UiKit } from '../../../Pages/UIKit/UIKit';
import { BlankSheet } from '../../../Pages/BlankSheet/BlankSheet';
import { ProjectsPage } from '../../../Pages/ProjectsPage/ProjectsPage';
import { IRouteObjectExtended } from './types';
import { Posts } from '../../../Pages/Posts/Posts';

export const routeConfig: IRouteObjectExtended[] = [
  {
    path: '/',
    element: <Posts />,
  },
  {
    path: allRoutePaths.users.path,
    element: <Users />,
  },
  {
    path: getRouteUserDetail(':id'),
    element: <UserProfile />,
  },
  {
    path: getRouteCurrentUser(),
    element: <UserProfile />,
  },
  {
    path: allRoutePaths.projects.path,
    element: <ProjectsPage />,
  },
  {
    path: allRoutePaths.uiKit.path,
    element: <UiKit />,
  },
  {
    path: getRouteBlankSheet(),
    element: <BlankSheet />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: getRouteForbidden(),
    element: <div>Нет доступна для данной роли</div>,
  },
];
