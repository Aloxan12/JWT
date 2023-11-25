import React, { memo } from 'react';
import cls from './AppInputFile.module.scss';

interface AppInputFileProps {}

export const AppInputFile = memo(({}: AppInputFileProps) => {
  return (
    <div className={cls.inputFileWrap}>
      <input type="file" />
    </div>
  );
});
