import React, { MouseEvent } from 'react';
import cls from './AppIco.module.scss';
import { classNames } from '../../lib/classNames/classNames';
import { ReactComponent } from '*.svg';

type SvgSizeType = 'sm' | 'base' | 'big';

interface AppSvgProps {
  className?: string;
  svg: typeof ReactComponent;
  size?: SvgSizeType;
  onClick?: () => void;
}

export const AppIco = ({ svg: Svg, className, size, onClick }: AppSvgProps) => {
  const onClickHandler = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onClick?.();
  };
  return (
    <Svg
      className={classNames(cls.ico, { [cls[size || '']]: !!size }, [className])}
      onClick={onClickHandler}
    />
  );
};
