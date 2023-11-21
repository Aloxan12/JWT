import React from 'react';

interface AppSvgProps {
  className?: string;
  svg: any;
  fill?: string;
}

export const AppSvg = ({ svg, fill, className }: AppSvgProps) => {
  console.log('svg', svg);
  return <>{/*<ReactComponent className={className} fill={fill} />*/}</>;
};
