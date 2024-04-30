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
  chat: {
    path: 'chat',
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
  testPage: {
    path: 'test',
  },
  forbidden: {
    path: '/forbidden',
  },
  ...userRoute,
};
