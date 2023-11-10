import React, { ImgHTMLAttributes, ReactElement, useLayoutEffect, useState } from 'react';

interface AppPhotoProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  fallback?: ReactElement;
  errorFallback?: ReactElement;
}

export const AppPhoto = ({
  className,
  fallback,
  errorFallback,
  src,
  alt,
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

  if (isLoading && fallback) {
    return fallback;
  }

  if (hasError && errorFallback) {
    return errorFallback;
  }

  return <img src={src} className={className} alt={alt} {...otherProps} />;
};
