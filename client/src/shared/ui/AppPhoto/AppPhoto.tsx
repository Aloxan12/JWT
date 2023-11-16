import React, { ImgHTMLAttributes, useLayoutEffect, useState } from 'react';
import { AppSkeleton } from '../AppSkeleton/AppSkeleton';
import cls from './AppPhoto.module.scss';
import { classNames } from '../../lib/classNames/classNames';

type PhotoRadiusType = '4' | '8' | '12';

interface AppPhotoProps extends ImgHTMLAttributes<HTMLImageElement> {
  radius?: PhotoRadiusType;
  className?: string;
}

export const AppPhoto = ({
  className,
  src,
  alt,
  width,
  height,
  radius = '4',
  ...otherProps
}: AppPhotoProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useLayoutEffect(() => {
    const img = new Image();
    img.src = src ?? '';
    img.onload = () => {
      setIsLoading(false);
    };
    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };
  }, [src]);

  if (isLoading) {
    return <AppSkeleton width={width} height={height} border={`${radius}px`} />;
  }

  if (hasError) {
    return <AppSkeleton width={width} height={height} border={`${radius}px`} />;
  }

  return (
    <img
      src={src}
      className={classNames(cls.img, {}, [className, cls[`border-radius-${radius}`]])}
      width={width}
      height={height}
      alt={alt}
      {...otherProps}
    />
  );
};
