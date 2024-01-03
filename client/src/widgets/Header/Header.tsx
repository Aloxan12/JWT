import React, { useEffect } from 'react';
import cls from './Header.module.scss';
import { useAppDispatch } from '../../app/core/redux/store';
import { useRefreshTokenQuery } from '../../app/core/api/authApi';
import { setAuthData } from '../../app/core/redux/Reducers/auth/authSlice';
import { Sidebar } from '../Sidebar/ui/Sidebar/Sidebar';
import { AppText } from '../../shared/ui/AppText/AppText';
import { HeaderAvatarMenu } from './components/HeaderAvatarMenu';

export const Header = () => {
  const { data: refreshTokenData } = useRefreshTokenQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (refreshTokenData) {
      dispatch(setAuthData(refreshTokenData));
    }
  }, [refreshTokenData, setAuthData, dispatch]);

  return (
    <header className={cls.mainHeaderWrap}>
      <div className={cls.headerContent}>
        <Sidebar />
        <AppText text="Название сайта" className={cls.title} />
        <HeaderAvatarMenu />
      </div>
    </header>
  );
};
