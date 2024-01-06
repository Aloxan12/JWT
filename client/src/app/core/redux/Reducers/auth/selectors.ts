import { RootState } from '../../store';
import { RoleTypes } from '../../../router/AppRouter';

export const getUserData = (stats: RootState) => stats.auth.user;
export const userIsAdmin = (stats: RootState) => stats.auth.user?.role === RoleTypes.ADMIN;
