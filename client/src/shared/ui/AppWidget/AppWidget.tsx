import React, { ReactNode } from 'react';
import cls from './AppWidget.module.scss';
import { classNames, Mods } from '../../lib/classNames/classNames';
import { AppIco } from '../AppSvg/AppIco';
import { ReactComponent as ArrowDown } from '../../assets/icons/arrow-down.svg';

interface AppWidgetPros {
  children: string | ReactNode;
  fullWidth?: boolean;
}

export const AppWidget = ({ children, fullWidth }: AppWidgetPros) => {
  const mods: Mods = {
    [cls.fullWidth]: fullWidth,
  };
  return (
    <div className={classNames(cls.widgetWrap, mods, [])}>
      <div className={cls.titleBlock}>
        <span>title</span>
        <div className={cls.icoBlock}>
          <AppIco svg={ArrowDown} className={cls.ico} />
        </div>
      </div>
      <div className={cls.content}>{children}</div>
    </div>
  );
};
