import React, { memo } from 'react';
import cls from './AppInputFile.module.scss';
import { classNames, Mods } from '../../lib/classNames/classNames';
import { ReactComponent } from '../../../utils/images/icons/search.svg';
import { AppSvg } from '../AppSvg/AppSvg';

type AppInputFileTheme = 'btn' | 'text';

interface AppInputFileProps {
  className?: string;
  text?: string;
  theme?: AppInputFileTheme;
  disabled?: boolean;
  ico?: typeof ReactComponent;
}

export const AppInputFile = memo(
  ({ text, theme = 'btn', className, disabled, ico }: AppInputFileProps) => {
    const mods: Mods = {
      [cls.disabled]: disabled,
      [cls.ico]: !!ico,
    };

    return (
      <label className={classNames(cls.inputFile, mods, [className, cls[theme]])}>
        <input type="file" name="file" />
        <div>
          {ico && <AppSvg svg={ico} size="base" className={`${cls.ico}`} />}
          {text || 'Выберите файл'}
        </div>
      </label>
    );
  }
);
