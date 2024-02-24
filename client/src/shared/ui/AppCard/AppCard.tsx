import React, { ReactNode } from 'react';
import { classNames, Mods } from '../../lib/classNames/classNames';
import cls from './AppCard.module.scss';
import { AppLink } from '../AppLink/AppLink';

interface AppCardProps {
  className?: string;
  classNameContent?: string;
  toContent?: string;
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
  toContent,
}: AppCardProps) => {
  const mods: Mods = {
    [cls.max]: max,
    [cls.boxShadow]: boxShadow,
    [cls.withoutBorder]: withoutBorder,
  };

  const content = <div className={classNames(cls.content, {}, [classNameContent])}>{children}</div>;

  return (
    <div className={classNames(cls.card, mods, [className])}>
      {title && <span className={cls.title}>{title}</span>}
      {toContent ? <AppLink to={toContent}>{content}</AppLink> : content}
    </div>
  );
};
