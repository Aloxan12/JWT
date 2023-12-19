import { RootState } from '../../store';

export const getUserData = (stats: RootState) => stats.auth.user;
