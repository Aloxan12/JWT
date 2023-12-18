import {
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

export const routeConfig: IRouteObjectExtended[] = [
  {
    path: getRouteUsers(),
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
    path: getRouteProjects(),
    element: <ProjectsPage />,
  },
  {
    path: getRouteUiKit(),
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
