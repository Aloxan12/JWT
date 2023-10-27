import React, { ReactNode } from 'react';
import { classNames, Mods } from '../../lib/classNames/classNames';
import cls from './AppCard.module.scss';

interface AppCardProps {
  className?: string;
  title?: string;
  max?: boolean;
  children: ReactNode;
}

export const AppCard = ({ className, children, title, max }: AppCardProps) => {
  const mods: Mods = {
    [cls.max]: max,
  };
  return (
    <div className={classNames(cls.card, mods, [className])}>
      {title && <span className={cls.title}>{title}</span>}
      <div className={cls.content}>{children}</div>
    </div>
  );
};
