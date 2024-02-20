import { allRoutePaths } from './routerPaths';
import { UserProfile } from '../../../pages/Users/ui/components/UserProfile';
import { NotFound } from '../../../pages/NotFound/NotFound';
import { UiKit } from '../../../pages/UIKit/UIKit';
import { ProjectsPage } from '../../../pages/ProjectsPage/ProjectsPage';
import { IRouteObjectExtended } from './types';
import { PostsPage } from '../../../pages/Posts';
import { PersonalAccount } from '../../../pages/PersonalAccount/PersonalAccount';
import { UsersPage } from '../../../pages/Users/index';

export const routeConfig: IRouteObjectExtended[] = [
  {
    path: '/',
    element: <PostsPage />,
  },
  {
    path: allRoutePaths.users.path,
    element: <UsersPage />,
    children: [
      {
        path: allRoutePaths.userDetail.path,
        element: <UserProfile />,
      },
    ],
  },
  {
    path: allRoutePaths.currentProfile.path,
    element: <PersonalAccount />,
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
    path: '*',
    element: <NotFound />,
  },
  {
    path: allRoutePaths.forbidden.path,
    element: <div>Нет доступна для данной роли</div>,
  },
];
