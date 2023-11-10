import React, { ImgHTMLAttributes, ReactElement, useLayoutEffect, useState } from 'react';
import { AppSkeleton } from '../AppSkeleton/AppSkeleton';

interface AppPhotoProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  errorFallback?: ReactElement;
}

export const AppPhoto = ({
  className,
  errorFallback,
  src,
  alt,
  width,
  height,
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
    return <AppSkeleton width={width} height={height} />;
  }

  if (hasError && errorFallback) {
    return errorFallback;
  }

  return <img src={src} className={className} alt={alt} {...otherProps} />;
};
