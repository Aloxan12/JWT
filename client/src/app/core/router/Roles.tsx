import { IRouteObjectExtended, IRoutesByRole } from './types';
import { routeConfig } from './routeConfig';
import { NotFound } from '../../../Pages/NotFound/NotFound';
import { MainLayoutPage } from '../../../widgets/MainLayoutPage/MainLayoutPage';
import { LogoutPage } from '../../../Pages/Logout';

export const RoutesByRole = ({ roles }: IRoutesByRole) => {
  const roleRoutes: IRouteObjectExtended[] = routeConfig
    .filter(
      (routeItem) => !routeItem.roles || routeItem.roles.some((role) => roles?.includes(role))
    )
    .map((routeItem) => ({ ...routeItem, roles: undefined }));

  const resultRole: IRouteObjectExtended[] = [
    {
      element: <MainLayoutPage />,
      path: '/',
      children: roleRoutes,
    },
    {
      path: '/logout',
      element: <LogoutPage />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ];
  return resultRole;
};
