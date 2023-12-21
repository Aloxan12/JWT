import React, { useState } from 'react';
import cls from './Sidebar.module.scss';
import { classNames, Mods } from '../../shared/lib/classNames/classNames';

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onOpenHandler = () => setIsOpen(true);
  const onCloseHandler = () => setIsOpen(false);

  const mods: Mods = {
    [cls.openMenu]: isOpen,
  };

  return (
    <div className={classNames(cls.sidebarWrap, mods, [])}>
      <div className={cls.icoBlock} onClick={onOpenHandler}>
        <span />
        <span />
        <span />
      </div>
    </div>
  );
};
