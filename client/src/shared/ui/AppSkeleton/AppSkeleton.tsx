import { CSSProperties, memo } from 'react';
import cls from './AppSkeleton.module.scss';
import { classNames } from '../../lib/classNames/classNames';

interface SkeletonProps {
  className?: string;
  height?: string | number;
  width?: string | number;
  border?: string;
}

export const AppSkeleton = memo((props: SkeletonProps) => {
  const { className, height, width, border } = props;
  const styles: CSSProperties = {
    width,
    height,
    borderRadius: border,
  };

  return <div className={classNames(cls.Skeleton, {}, [className])} style={styles} />;
});
