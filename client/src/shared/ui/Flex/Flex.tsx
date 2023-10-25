import React, { ReactNode } from 'react';
import cls from './Flex.module.scss';
import { classNames, Mods } from '../../lib/classNames/classNames';

interface FlexProps {
  className?: string;
  children: ReactNode;
}

export const Flex = ({ children, className }: FlexProps) => {
  const mods: Mods = {};
  return <div className={classNames(cls.flex, mods, [className])}>{children}</div>;
};
