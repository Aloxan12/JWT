import { IRouteObjectExtended, IRoutesByRole } from './types';
import { routeConfig } from './routeConfig';
import { NotFound } from '../../../Pages/NotFound/NotFound';
import { MainLayoutPage } from '../../../widgets/MainLayoutPage/MainLayoutPage';

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
      element: <div>Выйти</div>,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ];
  return resultRole;
};
