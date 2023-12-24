import React, { useMemo, useState } from 'react';
import cls from './Sidebar.module.scss';
import { classNames, Mods } from '../../../../shared/lib/classNames/classNames';
import { Flex } from '../../../../shared/ui/Flex/Flex';
import { AppText } from '../../../../shared/ui/AppText/AppText';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { useAppSelector } from '../../../../app/core/redux/store';
import { getSidebarItemList } from '../../model/selectors';

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onOpenHandler = () => setIsOpen(true);
  const onCloseHandler = () => setIsOpen(false);
  const sidebarItemsList = useAppSelector(getSidebarItemList);

  const mods: Mods = {
    [cls.openMenu]: isOpen,
  };

  const itemsList = useMemo(
    () =>
      sidebarItemsList.map((item) => (
        <SidebarItem item={item} key={item.path} onClose={onCloseHandler} />
      )),
    [isOpen, sidebarItemsList, onCloseHandler]
  );

  return (
    <div className={classNames(cls.sidebarWrap, mods, [])}>
      <div className={cls.icoBlock} onClick={onOpenHandler}>
        <span />
        <span />
        <span />
      </div>

      <Flex className={cls.sidebarMenu} direction="column" gap="32">
        <AppText className={cls.title} bold="700" text="Меню" />
        {itemsList}
      </Flex>
      {isOpen && <div className={cls.overlay} onClick={onCloseHandler} />}
    </div>
  );
};
