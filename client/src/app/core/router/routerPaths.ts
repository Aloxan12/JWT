const userRoute = {
  users: {
    path: 'users',
  },
  userDetail: {
    path: ':userId',
  },
};

export const allRoutePaths = {
  login: {
    path: 'login',
  },
  registration: {
    path: 'registration',
  },
  main: {
    path: '/',
  },
  currentProfile: {
    path: 'current-profile',
  },
  uiKit: {
    path: 'ui-kit',
  },
  projects: {
    path: 'projects',
  },
  forbidden: {
    path: '/forbidden',
  },
  ...userRoute,
};
