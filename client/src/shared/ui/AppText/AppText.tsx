import React, { memo } from 'react';
import cls from './AppText.module.scss';
import { classNames, Mods } from '../../lib/classNames/classNames';

type TextBold = '400' | '500' | '600' | '700';
type TextSize = '14' | '16' | '18';
type TextColor = 'black' | 'red' | 'gray';
type TextAlign = 'left' | 'center' | 'right';

interface AppTextProps {
  className?: string;
  text: string;
  bold?: TextBold;
  size?: TextSize;
  color?: TextColor;
  align?: TextAlign;
}

export const AppText = memo(
  ({ text, className, size = '16', bold = '400', color = 'black', align }: AppTextProps) => {
    const mods: Mods = {
      [cls.align]: align,
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
