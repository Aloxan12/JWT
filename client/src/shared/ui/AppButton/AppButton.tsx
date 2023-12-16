import React, { memo } from 'react';
import cls from './AppButton.module.scss';
import { classNames, Mods } from '../../lib/classNames/classNames';
import { AppTooltip } from '../AppTooltip/AppTooltip';
import { AppSvg } from '../AppSvg/AppSvg';
import { ReactComponent } from '*.svg';

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
  icoLeft?: typeof ReactComponent;
  icoRight?: typeof ReactComponent;
  onClick?: () => void;
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
        {icoLeft && <AppSvg svg={icoLeft} />}
        <span>{title}</span>
        {icoRight && <AppSvg svg={icoRight} />}
      </button>
    );

    if (tooltipText) {
      return <AppTooltip content={tooltipText}>{content}</AppTooltip>;
    }

    return content;
  }
);
