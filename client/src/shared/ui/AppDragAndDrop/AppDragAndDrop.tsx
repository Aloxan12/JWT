import React, { ReactNode, useState } from 'react';
import cls from './AppDragAndDrop.module.scss';
import { classNames } from '../../lib/classNames/classNames';

export interface AppDragAndDropProps {
  className?: string;
  file: File | null;
  setFile: (file: File | null) => void;
  children?: ReactNode;
}

export const AppDragAndDrop = ({ className, file, setFile, children }: AppDragAndDropProps) => {
  const [drag, setDrag] = useState(false);

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(true);
  };
  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(false);
  };
  const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files;
    setFile(file[0]);
    setDrag(false);
  };

  return (
    <div className={classNames(cls.dropBlock, {}, [className])}>
      {drag ? (
        <div
          className={cls.dropArea}
          onDragStart={dragStartHandler}
          onDragLeave={dragLeaveHandler}
          onDragOver={dragStartHandler}
          onDrop={onDropHandler}
        >
          <span>Отпустите файл, чтобы загрузить его</span>
        </div>
      ) : (
        <div
          className={cls.dropItem}
          onDragStart={dragStartHandler}
          onDragLeave={dragLeaveHandler}
          onDragOver={dragStartHandler}
        >
          {!!children ? (
            children
          ) : (
            <span>Перетащите файл, чтобы {file ? `заменить(${file.name})` : 'загрузить'} его</span>
          )}
        </div>
      )}
    </div>
  );
};
