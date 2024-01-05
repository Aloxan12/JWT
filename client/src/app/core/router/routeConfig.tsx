import {
  allRoutePaths,
  getRouteBlankSheet,
  getRouteCurrentUser,
  getRouteForbidden,
  getRouteUserDetail,
} from './routerPaths';
import { Users } from '../../../pages/Users/Users';
import { UserProfile } from '../../../pages/Users/UserProfile';
import { NotFound } from '../../../pages/NotFound/NotFound';
import { UiKit } from '../../../pages/UIKit/UIKit';
import { BlankSheet } from '../../../pages/BlankSheet/BlankSheet';
import { ProjectsPage } from '../../../pages/ProjectsPage/ProjectsPage';
import { IRouteObjectExtended } from './types';
import { PostsPage } from '../../../pages/Posts';

export const routeConfig: IRouteObjectExtended[] = [
  {
    path: '/',
    element: <PostsPage />,
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
