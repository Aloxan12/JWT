import React, { ImgHTMLAttributes, useEffect, useState } from 'react';
import { AppSkeleton } from '../AppSkeleton/AppSkeleton';
import cls from './AppPhoto.module.scss';
import { classNames } from '../../lib/classNames/classNames';

type PhotoRadiusType = '4' | '8' | '12' | '50%';
type PhotoFitType = 'cover' | 'contain';

interface AppPhotoProps extends ImgHTMLAttributes<HTMLImageElement> {
  radius?: PhotoRadiusType;
  fit?: PhotoFitType;
  className?: string;
}

export const AppPhoto = ({
  className,
  src,
  alt,
  width,
  height,
  radius = '4',
  fit = 'cover',
  ...otherProps
}: AppPhotoProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const newUrl = 'https://lh3.google.com/u/0/d/NEW_ID';

  const srcFromGoogle =
    src?.includes('drive.google.com') && src?.includes('&id=')
      ? newUrl.replace('NEW_ID', src.split('&id=')[1])
      : src;
  const newSrc = src ? srcFromGoogle : undefined;

  useEffect(() => {
    const img = new Image();
    img.src = newSrc ?? '';
    img.onload = () => {
      setIsLoading(false);
    };
    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };
  }, [newSrc]);

  if (isLoading) {
    return <AppSkeleton width={width} height={height} border={`${radius}`} className={className} />;
  }

  if (hasError) {
    return <AppSkeleton width={width} height={height} border={`${radius}`} className={className} />;
  }

  return (
    <img
      src={newSrc}
      className={classNames(cls.img, {}, [cls[`border-radius-${radius}`], cls[fit], className])}
      width={width}
      height={height}
      alt={alt}
      {...otherProps}
    />
  );
};
