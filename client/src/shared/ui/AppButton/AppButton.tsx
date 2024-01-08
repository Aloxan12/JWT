import React, { memo } from 'react';
import cls from './AppButton.module.scss';
import { classNames, Mods } from '../../lib/classNames/classNames';
import { Tooltip } from '../Tooltip/Tooltip';
import { AppIco } from '../AppSvg/AppIco';
import { ReactComponent } from '*.svg';

type AppButtonSize = 'small' | 'base' | 'big';
type AppButtonTheme = 'clear' | 'outline' | 'full-bg';

interface AppButtonProps {
  className?: string;
  title?: string;
  text?: string;
  size?: AppButtonSize;
  theme?: AppButtonTheme;
  disabled?: boolean;
  isLoading?: boolean;
  max?: boolean;
  tooltipText?: string;
  icoLeft?: typeof ReactComponent;
  icoRight?: typeof ReactComponent;
  onClick?: () => void;
}

export const AppButton = memo(
  ({
    className,
    title,
    text,
    size = 'base',
    theme = 'outline',
    disabled,
    isLoading,
    max,
    tooltipText,
    icoRight,
    icoLeft,
    onClick,
  }: AppButtonProps) => {
    const mods: Mods = {
      [cls.size]: size,
      [cls.disabled]: isLoading || disabled,
      [cls.max]: max,
      [cls.icoLeft]: !!icoLeft,
      [cls.icoRight]: !!icoRight,
    };

    const content = (
      <button
        className={classNames(cls.button, mods, [className, cls[theme], cls[size]])}
        disabled={disabled}
        onClick={onClick}
      >
        {isLoading && <div className={cls.loading} />}
        {icoLeft && <AppIco svg={icoLeft} />}
        <span>{title || text}</span>
        {icoRight && <AppIco svg={icoRight} />}
      </button>
    );

    if (tooltipText) {
      return <Tooltip content={tooltipText}>{content}</Tooltip>;
    }

    return content;
  }
);
