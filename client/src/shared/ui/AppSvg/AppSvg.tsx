import React from 'react';
import { ReactComponent } from '../../../utils/images/icons/search.svg';
import cls from './AppSvg.module.scss';
import { classNames } from '../../lib/classNames/classNames';

type SvgSizeType = 'sm' | 'base' | 'big';

interface AppSvgProps {
  className?: string;
  svg: typeof ReactComponent;
  size?: SvgSizeType;
}

export const AppSvg = ({ svg: Svg, className, size = 'base' }: AppSvgProps) => {
  return <Svg className={classNames(cls.ico, {}, [className, cls[size]])} />;
};
