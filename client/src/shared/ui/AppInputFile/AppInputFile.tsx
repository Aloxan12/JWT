import React, { memo } from 'react';
import cls from './AppInputFile.module.scss';

interface AppInputFileProps {
  className?: string;
  text?: string;
}

export const AppInputFile = memo(({}: AppInputFileProps) => {
  return (
    <div className={cls.inputFileWrap}>
      <label className={cls.inputFile}>
        <input type="file" name="file" />
        <span>Выберите файл</span>
      </label>
    </div>
  );
});
