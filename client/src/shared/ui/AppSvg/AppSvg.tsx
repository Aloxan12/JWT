import React from 'react';
import cls from './AppSvg.module.scss';
import { classNames } from '../../lib/classNames/classNames';
import { ReactComponent } from '*.svg';

type SvgSizeType = 'sm' | 'base' | 'big';

interface AppSvgProps {
  className?: string;
  svg: typeof ReactComponent;
  size?: SvgSizeType;
  onClick?: () => void;
}

export const AppSvg = ({ svg: Svg, className, size, onClick }: AppSvgProps) => {
  return (
    <Svg
      className={classNames(cls.ico, { [cls[size || '']]: !!size }, [className])}
      onClick={onClick}
    />
  );
};
