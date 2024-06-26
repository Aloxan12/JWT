import { createSelector } from '@reduxjs/toolkit';
import { getUserData } from '../../../app/core/redux/Reducers/auth/selectors';
import { ISidebarItem } from './types';
import { allRoutePaths } from '../../../app/core/router/routerPaths';
import { ReactComponent as SearchIco } from '../../../shared/assets/icons/search.svg';

const sidebarItemList: ISidebarItem[] = [
  { name: 'Главная', path: allRoutePaths.main.path, ico: SearchIco },
  { name: 'Пользователи', path: allRoutePaths.users.path, ico: SearchIco },
  { name: 'UI kit', path: allRoutePaths.uiKit.path, ico: SearchIco },
  {
    name: 'Страница для разработки в текущее время',
    path: allRoutePaths.testPage.path,
    ico: SearchIco,
  },
  { name: 'Мои проекты', path: allRoutePaths.projects.path, ico: SearchIco },
  { name: 'Общий чат', path: allRoutePaths.chat.path, ico: SearchIco },
];

export const getSidebarItemList = createSelector(getUserData, (user) => sidebarItemList);
