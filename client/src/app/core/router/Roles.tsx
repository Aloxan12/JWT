import { IRouteObjectExtended, IRoutesByRole } from './types';
import { routeConfig } from './routeConfig';
import { MainLayout } from '../../../Pages/MainLayout/MainLayout';
import { NotFound } from '../../../Pages/NotFound/NotFound';

export const RoutesByRole = ({ roles }: IRoutesByRole) => {
  const roleRoutes: IRouteObjectExtended[] = routeConfig
    .filter(
      (routeItem) => !routeItem.roles || routeItem.roles.some((role) => roles?.includes(role))
    )
    .map((routeItem) => ({ ...routeItem, roles: undefined }));

  const resultRole: IRouteObjectExtended[] = [
    {
      element: <MainLayout />,
      path: '/',
      children: roleRoutes,
    },
    {
      path: '/logout',
      element: <div>Выйти</div>,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ];
  return resultRole;
};
