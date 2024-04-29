import React, { ReactNode, useEffect, useState } from 'react';
import cls from './AppWidget.module.scss';
import { classNames, Mods } from '../../lib/classNames/classNames';
import { AppIco } from '../AppSvg/AppIco';
import { ReactComponent as ArrowDown } from '../../assets/icons/arrow-down.svg';

interface AppWidgetPros {
  children: string | ReactNode;
  title: string;
  fullWidth?: boolean;
  initValue?: boolean;
}

export const AppWidget = ({ children, fullWidth, title, initValue = false }: AppWidgetPros) => {
  const [active, setActive] = useState(initValue);

  const onToggleHandler = () => setActive((prev) => !prev);

  const mods: Mods = {
    [cls.active]: active,
    [cls.fullWidth]: fullWidth,
  };
  return (
    <div className={classNames(cls.widgetWrap, mods, [])}>
      <div className={cls.titleBlock}>
        <span>{title}</span>
        <div className={cls.icoBlock} onClick={onToggleHandler}>
          <AppIco svg={ArrowDown} className={cls.ico} />
        </div>
      </div>
      <div className={cls.content}>{children}</div>
    </div>
  );
};
