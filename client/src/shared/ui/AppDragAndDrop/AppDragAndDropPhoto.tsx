import React from 'react';
import { AppDragAndDrop, AppDragAndDropProps } from './AppDragAndDrop';
import { classNames } from '../../lib/classNames/classNames';
import cls from './AppDragAndDrop.module.scss';
import { AppPhoto } from '../AppPhoto/AppPhoto';

export const AppDragAndDropPhoto = ({
  file,
  setFile,
  children,
  className,
}: AppDragAndDropProps) => {
  if (file) {
    return (
      <div className={classNames(cls.dropBlock, {}, [className])}>
        <AppPhoto
          src={URL.createObjectURL(file)}
          height="100%"
          width="100%"
          className={cls.photo}
        />
      </div>
    );
  }

  return <AppDragAndDrop file={file} setFile={setFile} className={className} children={children} />;
};
