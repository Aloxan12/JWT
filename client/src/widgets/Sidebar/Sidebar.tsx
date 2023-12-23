import React, { useMemo, useState } from 'react';
import cls from './Sidebar.module.scss';
import { classNames, Mods } from '../../shared/lib/classNames/classNames';
import ReactComponent from '*.svg';
import { Flex } from '../../shared/ui/Flex/Flex';
import { AppText } from '../../shared/ui/AppText/AppText';
import { AppLink } from '../../shared/ui/AppLink/AppLink';
import { AppIco } from '../../shared/ui/AppSvg/AppIco';
import { ReactComponent as SearchIco } from '../../utils/images/icons/search.svg';

const sidebarItemsList = [
  { name: 'name', path: '/' },
  { name: 'name2', path: 'path2' },
  { name: 'nam3e', path: 'path3' },
  { name: 'na4me', path: 'path4' },
  { name: 'n5ame', path: 'path5' },
  { name: '6name', path: 'path6' },
];

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

      <Flex className={cls.sidebarMenu} direction="column" gap="32">
        <AppText className={cls.title} bold="700" text="Меню" />
        {itemsList}
      </Flex>
    </div>
  );
};

interface SidebarItemProps {
  item: { name: string; path: string; ico?: typeof ReactComponent };
}

const SidebarItem = ({ item }: SidebarItemProps) => {
  return (
    <AppLink className={cls.sidebarItem} activeClassName={cls.active} to={item.path}>
      <div className={cls.icoBlock}>
        <AppIco svg={SearchIco} className={cls.ico} />
      </div>
      <AppText text={item.name} size="20" />
    </AppLink>
  );
};
