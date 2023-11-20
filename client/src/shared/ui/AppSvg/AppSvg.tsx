import React from 'react';

interface AppSvgProps {
  className?: string;
  svg: string;
  fill?: string;
}

export const AppSvg = ({ svg, fill, className }: AppSvgProps) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg">
      <use xlinkHref={svg} fill={fill || '#000'} />
    </svg>
  );
};
