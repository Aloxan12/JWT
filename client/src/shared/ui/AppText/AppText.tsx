import React, { memo } from 'react';
import cls from './AppText.module.scss';
import { classNames, Mods } from '../../lib/classNames/classNames';

type TextBold = '400' | '500' | '600' | '700';
type TextSize = '14' | '16' | '18' | '20';
type TextColor = 'black' | 'red' | 'gray' | 'violet';
type TextAlign = 'left' | 'center' | 'right';

interface AppTextProps {
  className?: string;
  text: string;
  bold?: TextBold;
  size?: TextSize;
  color?: TextColor;
  align?: TextAlign;
  isEllipsis?: boolean;
}

export const AppText = memo(
  ({
    text,
    className,
    size = '16',
    bold = '400',
    color = 'black',
    align,
    isEllipsis,
  }: AppTextProps) => {
    const mods: Mods = {
      [cls.align]: align,
      [cls.ellipsis]: isEllipsis,
    };
    return (
      <p
        className={classNames(cls.text, mods, [
          className,
          cls[`bold-${bold}`],
          cls[`size-${size}`],
          cls[color],
        ])}
      >
        {text}
      </p>
    );
  }
);
