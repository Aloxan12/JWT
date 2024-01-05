import React from 'react';
import cls from './AppTitle.module.scss';
import { classNames } from '../../lib/classNames/classNames';

type TitleType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type TitleAlign = 'left' | 'center' | 'right';

interface AppTitleProps {
  title: string;
  className?: string;
  titleTag?: TitleType;
  align?: TitleAlign;
}

export const AppTitle = ({
  title,
  titleTag: TitleTag = 'h2',
  align = 'left',
  className,
}: AppTitleProps) => {
  return (
    <TitleTag className={classNames(cls.titleWrap, {}, [cls[align], className])}>{title}</TitleTag>
  );
};
