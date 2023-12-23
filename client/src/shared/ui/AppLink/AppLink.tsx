import React, { ReactNode } from 'react';
import { LinkProps, NavLink } from 'react-router-dom';
import { classNames } from '../../lib/classNames/classNames';
import cls from './AppLink.module.scss';

interface AppLinkProps extends LinkProps {
  className?: string;
  activeClassName?: string;
  children: string | ReactNode;
}

export const AppLink = ({ children, className, activeClassName, ...otherProps }: AppLinkProps) => {
  return (
    <NavLink
      className={({ isActive }) =>
        classNames(cls.link, { [activeClassName || '']: isActive }, [className])
      }
      {...otherProps}
    >
      {children}
    </NavLink>
  );
};
