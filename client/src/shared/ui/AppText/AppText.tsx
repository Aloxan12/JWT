import React, { memo } from 'react';
import cls from './AppText.module.scss';
import { classNames, Mods } from '../../lib/classNames/classNames';

type TextBold = '400' | '500' | '600' | '700';
type TextSize = '14' | '16' | '18';

interface AppTextProps {
  className?: string;
  text: string;
  bold?: TextBold;
  size?: TextSize;
}

export const AppText = memo(({ text, className, size = '16', bold = '400' }: AppTextProps) => {
  const mods: Mods = {};
  return (
    <p
      className={classNames(cls.text, mods, [className, cls[`bold-${bold}`], cls[`size-${size}`]])}
    >
      {text}
    </p>
  );
});
