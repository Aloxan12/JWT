import React, { useMemo, useState } from 'react';
import cls from './Sidebar.module.scss';
import { classNames, Mods } from '../../shared/lib/classNames/classNames';
import ReactComponent from '*.svg';

const sidebarItemsList = [{ name: 'name', path: 'path1' }];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onOpenHandler = () => setIsOpen(true);
  const onCloseHandler = () => setIsOpen(false);

  const mods: Mods = {
    [cls.openMenu]: isOpen,
  };

  const itemsList = useMemo(
    () => sidebarItemsList.map((item) => <SidebarItem item={item} key={item.path} />),
    [isOpen, sidebarItemsList]
  );

  return (
    <div className={classNames(cls.sidebarWrap, mods, [])}>
      <div className={cls.icoBlock} onClick={onOpenHandler}>
        <span />
        <span />
        <span />
      </div>

      <div className={cls.sidebarMenu}></div>
    </div>
  );
};

interface SidebarItemProps {
  item: { name: string; path: string; ico?: typeof ReactComponent };
}

const SidebarItem = ({}: SidebarItemProps) => {
  return <div></div>;
};
