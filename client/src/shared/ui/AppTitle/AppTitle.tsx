import React from 'react';

type TitleType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface AppTitleProps {
  title: string;
  titleTag?: TitleType;
}

export const AppTitle = ({ title, titleTag: TitleTag = 'h2' }: AppTitleProps) => {
  return <TitleTag>{title}</TitleTag>;
};
