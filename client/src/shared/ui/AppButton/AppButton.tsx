import React, { memo } from 'react';
import cls from './AppButton.module.scss';
import { classNames, Mods } from '../../lib/classNames/classNames';

type AppButtonSize = 'small' | 'base' | 'big';

interface AppButtonProps {
  className?: string;
  title?: string;
  size?: AppButtonSize;
}

export const AppButton = memo(({ className, title, size = 'base' }: AppButtonProps) => {
  const mods: Mods = {
    [cls.size]: size,
  };
  return <button className={classNames(cls.button, mods, [className])}>{title}</button>;
});
