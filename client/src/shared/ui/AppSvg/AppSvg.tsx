import React from 'react';
import { ReactComponent } from '../../../utils/images/icons/search.svg';

interface AppSvgProps {
  className?: string;
  svg: typeof ReactComponent;
  fill?: string;
}

export const AppSvg = ({ svg: Svg, fill, className }: AppSvgProps) => {
  console.log('svg', Svg);
  return <Svg className={className} />;
};
