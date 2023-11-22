import React from 'react';
import { ReactComponent } from '../../../utils/images/icons/search.svg';
import cls from './AppSvg.module.scss';
import { classNames } from '../../lib/classNames/classNames';

interface AppSvgProps {
  className?: string;
  svg: typeof ReactComponent;
}

export const AppSvg = ({ svg: Svg, className }: AppSvgProps) => {
  return <Svg className={classNames(cls.ico, {}, [className])} />;
};
