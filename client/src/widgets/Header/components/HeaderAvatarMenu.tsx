import React, { memo, useCallback, useMemo, useState } from 'react';
import { Flex } from '../../../shared/ui/Flex/Flex';
import cls from '../Header.module.scss';
import { AppLink } from '../../../shared/ui/AppLink/AppLink';
import { AppPopover } from '../../../shared/ui/AppPopover/AppPopover';
import { AppAvatar } from '../../../shared/ui/AppAvatar/AppAvatar';
import { useAppSelector } from '../../../app/core/redux/store';
import { allRoutePaths } from '../../../app/core/router/routerPaths';

const menuData = [
  { name: 'Профиль', path: allRoutePaths.currentProfile.path },
  { name: 'Выйти', path: 'logout' },
];

export const HeaderAvatarMenu = memo(() => {
  const { user } = useAppSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const onMenuOpen = useCallback(() => setIsOpen(true), []);
  const onMenuClose = useCallback(() => setIsOpen(false), []);

  const menuList = useMemo(() => {
    return (
      <Flex direction="column" gap="8" align="start" className={cls.menuList}>
        {menuData.map((item) => (
          <AppLink to={item.path} key={item.path} onClick={onMenuClose}>
            {item.name}
          </AppLink>
        ))}
      </Flex>
    );
  }, [onMenuClose]);
  return (
    <Flex className={cls.userPopover} gap="8">
      <span className={cls.email}>{user?.email}</span>
      <AppPopover
        active={isOpen}
        setActive={setIsOpen}
        positionsV="bottom"
        positionsH="left"
        content={menuList}
        btn={<AppAvatar src={user?.avatar} onMouseOver={onMenuOpen} className={cls.avatar} />}
      />
    </Flex>
  );
});
