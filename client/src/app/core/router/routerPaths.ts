export enum AppRoutes {
  MAIN = 'main',
  CURRENT_USER = 'current_user',
  USERS = 'users',
  USERS_DETAIL = 'users_detail',
  PROJECTS = 'projects',
  UI_KIT = 'ui_kit',
  BLANK_SHEET = 'blank-sheet',
  // last
  LOGIN = 'login',
  REGISTRATION = 'registration',
  NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/';
export const getRouteRegistration = () => '/registration';
export const getRouteCurrentUser = () => '/current-user';
export const getRouteUsers = () => '/users';
export const getRouteUserDetail = (id: string) => `/users/${id}`;
export const getRouteUiKit = () => '/ui-kit';
export const getRouteBlankSheet = () => '/blank-sheet';
export const getRouteProjects = () => '/projects';
export const getRouteForbidden = () => '/forbidden';
