import { allRoutePaths } from './routerPaths';
import { UserProfile } from '../../../pages/Users/ui/components/UserProfile';
import { NotFound } from '../../../pages/NotFound/NotFound';
import { UiKit } from '../../../pages/UIKit/UIKit';
import { ProjectsPage } from '../../../pages/ProjectsPage/ProjectsPage';
import { IRouteObjectExtended } from './types';
import { PostsPage } from '../../../pages/Posts';
import { PersonalAccount } from '../../../pages/PersonalAccount/PersonalAccount';
import { UsersPage } from '../../../pages/Users/index';
import { ChatPage } from '../../../pages/ChatPage';
import { TestPage } from '../../../pages/TestPage';

export const routeConfig: IRouteObjectExtended[] = [
  {
    path: '/',
    element: <PostsPage />,
  },
  {
    path: allRoutePaths.users.path,
    children: [
      { index: true, element: <UsersPage /> },
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
    path: allRoutePaths.chat.path,
    element: <ChatPage />,
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
    path: allRoutePaths.testPage.path,
    element: <TestPage />,
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
