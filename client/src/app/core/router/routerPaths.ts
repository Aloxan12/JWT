export const getRouteMain = () => '/';
export const getRouteRegistration = () => '/registration';
export const getRouteCurrentUser = () => '/current-user';
export const getRouteUsers = () => '/users';
export const getRouteUserDetail = (id: string) => `/users/${id}`;
export const getRouteUiKit = () => '/ui-kit';
export const getRouteBlankSheet = () => '/blank-sheet';
export const getRouteProjects = () => '/projects';
export const getRouteForbidden = () => '/forbidden';

export const allRoutePaths = {
  login: {
    path: 'login',
  },
  registration: {
    path: 'registration',
  },
};
