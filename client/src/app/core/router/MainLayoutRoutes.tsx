import { useRoutes } from 'react-router-dom';
import { useMemo, Suspense } from 'react';
import { IRouteObjectExtended, RoleTypes } from './types';
import { RoutesByRole } from './Roles';
import { useAppSelector } from '../redux/store';
import { getUserData } from '../redux/Reducers/auth/selectors';
import { AppLoader } from '../../../widgets/AppLoader/AppLoader';

interface IUserRoutes {
  routesByUserRole: IRouteObjectExtended[];
}

const UserRoutes = ({ routesByUserRole }: IUserRoutes) => {
  const element = useRoutes(routesByUserRole);
  return <Suspense fallback={<AppLoader />}>{element}</Suspense>;
};

export const MainLayoutRoutes = () => {
  const user = useAppSelector(getUserData);
  const routesByUserRole = useMemo(() => {
    return user ? RoutesByRole({ roles: [user.role] as RoleTypes[] }) : [];
  }, [user]);
  if (routesByUserRole.length === 0) {
    return null;
  }
  return <UserRoutes routesByUserRole={routesByUserRole} />;
};
