import { useRoutes } from 'react-router-dom';
import { useMemo, Suspense } from 'react';
import { IRouteObjectExtended, RoleTypes } from './types';
import { RoutesByRole } from './Roles';

interface IUserRoutes {
  routesByUserRole: IRouteObjectExtended[];
}

const UserRoutes = ({ routesByUserRole }: IUserRoutes) => {
  const element = useRoutes(routesByUserRole);
  return <Suspense fallback="Загрузка">{element}</Suspense>;
};

export const MainLayoutRoutes = () => {
  // const { data: currentUser } = useGetCurrentUserQuery()
  const currentUser = { userRoles: [RoleTypes.ADMIN] };
  const routesByUserRole = useMemo(() => {
    return currentUser ? RoutesByRole({ roles: currentUser.userRoles as RoleTypes[] }) : [];
  }, [currentUser]);
  if (routesByUserRole.length === 0) {
    return null;
  }
  return <UserRoutes routesByUserRole={routesByUserRole} />;
};
