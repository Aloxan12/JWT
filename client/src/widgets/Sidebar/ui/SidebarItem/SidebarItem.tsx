import React from 'react';
import { AppLink } from '../../../../shared/ui/AppLink/AppLink';
import cls from './SidebarItem.module.scss';
import { AppIco } from '../../../../shared/ui/AppSvg/AppIco';
import { ReactComponent as SearchIco } from '../../../../shared/assets/icons/search.svg';
import { AppText } from '../../../../shared/ui/AppText/AppText';
import { ISidebarItem } from '../../model/types';

interface SidebarItemProps {
  item: ISidebarItem;
  onClose: () => void;
}

export const SidebarItem = ({ item, onClose }: SidebarItemProps) => {
  return (
    <AppLink
      className={cls.sidebarItem}
      activeClassName={cls.active}
      to={item.path}
      onClick={onClose}
    >
      <div className={cls.icoBlock}>
        <AppIco svg={SearchIco} className={cls.ico} />
      </div>
      <AppText text={item.name} size="20" />
    </AppLink>
  );
};
