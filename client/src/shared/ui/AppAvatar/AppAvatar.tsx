import React, { ImgHTMLAttributes } from 'react';
import { AppPhoto } from '../AppPhoto/AppPhoto';
import avatarFake from '../../assets/images/fake_avatar.png';
import { classNames } from '../../lib/classNames/classNames';
import cls from './AppAvatar.module.scss';

interface AppAvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  src?: string;
}

export const AppAvatar = ({ src, className, ...otherProps }: AppAvatarProps) => {
  return (
    <AppPhoto
      className={classNames(cls.avatarWrap, {}, [className])}
      src={src || avatarFake}
      width={'40px'}
      {...otherProps}
    />
  );
};
