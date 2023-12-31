import React, { useEffect, useState } from 'react';
import cls from './Header.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/core/redux/store';
import { useRefreshTokenQuery } from '../../app/core/api/authApi';
import { setAuthData } from '../../app/core/redux/Reducers/auth/authSlice';
import { Sidebar } from '../Sidebar/ui/Sidebar/Sidebar';
import { AppAvatar } from '../../shared/ui/AppAvatar/AppAvatar';
import { AppLink } from '../../shared/ui/AppLink/AppLink';
import { AppText } from '../../shared/ui/AppText/AppText';
import { Flex } from '../../shared/ui/Flex/Flex';
import { AppTooltip } from '../../shared/ui/AppTooltip/AppTooltip';

export const Header = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: refreshTokenData } = useRefreshTokenQuery();
  const dispatch = useAppDispatch();
  const [isMenuClose, setIsMenuClose] = useState(false);

  useEffect(() => {
    if (refreshTokenData) {
      dispatch(setAuthData(refreshTokenData));
    }
  }, [refreshTokenData, setAuthData, dispatch]);

  const onMenuHandler = () => setIsMenuClose((prevState) => !prevState);

  return (
    <header className={cls.mainHeaderWrap}>
      <div className={cls.headerContent}>
        <Sidebar />
        <AppText text="Название сайта" className={cls.title} />
        <Flex className={cls.userPopover} gap="8">
          <span>{user?.email}</span>
          <AppTooltip
            tooltipContent={<div onMouseDown={onMenuHandler}>меню</div>}
            positionContentH="left"
            positionContentV="bottom"
            outsideClose={isMenuClose}
          >
            <AppAvatar src={user?.avatar} onMouseOver={onMenuHandler} />
          </AppTooltip>
          <AppLink to={'/logout'} children="Выйти" />
        </Flex>
      </div>
    </header>
  );
};
