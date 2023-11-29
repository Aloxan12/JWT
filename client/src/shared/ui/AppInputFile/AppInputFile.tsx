import React, { memo } from 'react';
import cls from './AppInputFile.module.scss';
import { classNames, Mods } from '../../lib/classNames/classNames';

type AppInputFileTheme = 'btn' | 'text';

interface AppInputFileProps {
  className?: string;
  text?: string;
  theme?: AppInputFileTheme;
  disabled?: boolean;
}

export const AppInputFile = memo(
  ({ text, theme = 'btn', className, disabled }: AppInputFileProps) => {
    const mods: Mods = {
      [cls.disabled]: disabled,
    };

    return (
      <label className={classNames(cls.inputFile, mods, [className, cls[theme]])}>
        <input type="file" name="file" />
        <span>{text || 'Выберите файл'}</span>
      </label>
    );
  }
);
