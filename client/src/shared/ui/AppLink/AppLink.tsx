import React, { ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { classNames } from '../../lib/classNames/classNames';
import cls from './AppLink.module.scss';

interface AppLinkProps extends LinkProps {
  className?: string;
  children: string | ReactNode;
}

export const AppLink = ({ children, className, ...otherProps }: AppLinkProps) => {
  return (
    <Link className={classNames(cls.link, {}, [className])} {...otherProps}>
      {children}
    </Link>
  );
};
