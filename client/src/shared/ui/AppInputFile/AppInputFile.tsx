import React, { ChangeEvent, memo, useState } from 'react';
import cls from './AppInputFile.module.scss';
import { classNames, Mods } from '../../lib/classNames/classNames';
import { ReactComponent } from '../../../utils/images/icons/search.svg';
import { AppSvg } from '../AppSvg/AppSvg';

type AppInputFileTheme = 'btn' | 'text';

interface AppInputFileProps {
  className?: string;
  onChange: (file: null | File) => void;
  text?: string;
  theme?: AppInputFileTheme;
  disabled?: boolean;
  ico?: typeof ReactComponent;
}

export const AppInputFile = memo(
  ({ text, theme = 'btn', className, disabled, ico, onChange }: AppInputFileProps) => {
    const [inputFile, setInputFile] = useState('');
    const mods: Mods = {
      [cls.disabled]: disabled,
      [cls.ico]: !!ico,
    };
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      const target = e.target;
      setInputFile(target.value);
      target.files && onChange(target.files[0]);
    };

    return (
      <label className={classNames(cls.inputFile, mods, [className, cls[theme]])}>
        <input value={inputFile} onChange={onChangeHandler} type="file" name="file" />
        <div>
          {ico && <AppSvg svg={ico} size="base" className={`${cls.ico}`} />}
          {text || 'Выберите файл'}
        </div>
      </label>
    );
  }
);
