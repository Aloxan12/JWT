import React, { ReactNode } from 'react';
import { classNames, Mods } from '../../lib/classNames/classNames';
import cls from './AppCard.module.scss';

interface AppCardProps {
  className?: string;
  classNameContent?: string;
  title?: string;
  max?: boolean;
  withoutBorder?: boolean;
  boxShadow?: boolean;
  children: ReactNode;
}

export const AppCard = ({
  className,
  classNameContent,
  children,
  title,
  max,
  withoutBorder,
  boxShadow,
}: AppCardProps) => {
  const mods: Mods = {
    [cls.max]: max,
    [cls.boxShadow]: boxShadow,
    [cls.withoutBorder]: withoutBorder,
  };
  return (
    <div className={classNames(cls.card, mods, [className])}>
      {title && <span className={cls.title}>{title}</span>}
      <div className={classNames(cls.content, {}, [classNameContent])}>{children}</div>
    </div>
  );
};
