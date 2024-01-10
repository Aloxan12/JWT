import React, { useState } from 'react';
import { AppDragAndDrop, AppDragAndDropProps } from './AppDragAndDrop';
import { classNames } from '../../lib/classNames/classNames';
import cls from './AppDragAndDrop.module.scss';
import { AppPhoto } from '../AppPhoto/AppPhoto';
import { AppIco } from '../AppSvg/AppIco';
import { ReactComponent as DotesVertical } from '../../../utils/images/icons/dotes-v.svg';
import { Flex } from '../Flex/Flex';
import { AppPopover } from '../AppPopover/AppPopover';

export const AppDragAndDropPhoto = ({
  file,
  setFile,
  children,
  className,
}: AppDragAndDropProps) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const removeFile = () => setFile(null);
  if (file) {
    return (
      <div className={classNames(cls.dropBlock, {}, [className])}>
        <AppPopover
          active={isOpenMenu}
          setActive={setIsOpenMenu}
          positionsH={'left'}
          classNameContent={cls.optionsList}
          btn={
            <Flex justify="center" className={cls.icoBlock}>
              <AppIco svg={DotesVertical} size="sm" />
            </Flex>
          }
          content={
            <Flex direction="column" gap="8" align="start">
              <div>Выбрать другой файл</div>
              <div onClick={removeFile}>Удалить</div>
            </Flex>
          }
          className={cls.optionsBlock}
        />
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
