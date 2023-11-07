import React, { memo } from 'react';
import cls from './AppButton.module.scss';
import { classNames, Mods } from '../../lib/classNames/classNames';

type AppButtonSize = 'small' | 'base' | 'big';
type AppButtonTheme = 'clear' | 'outline' | 'full-bg';

interface AppButtonProps {
  className?: string;
  title?: string;
  size?: AppButtonSize;
  theme?: AppButtonTheme;
  disabled?: boolean;
  isLoading?: boolean;
  max?: boolean;
  tooltipText?: string;
}

export const AppButton = memo(
  ({
    className,
    title,
    size = 'base',
    theme = 'outline',
    disabled,
    isLoading,
    max,
  }: AppButtonProps) => {
    const mods: Mods = {
      [cls.size]: size,
      [cls.disabled]: isLoading || disabled,
      [cls.max]: max,
    };
    return (
      <button
        className={classNames(cls.button, mods, [className, cls[theme], cls[size]])}
        disabled={disabled}
      >
        {isLoading && <div className={cls.loading} />}
        <span>{title}</span>
      </button>
    );
  }
);
