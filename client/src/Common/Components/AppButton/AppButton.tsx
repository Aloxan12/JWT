import React, { MouseEvent } from 'react';
import styles from './AppButton.module.scss';

export enum AppBtnColor {
  red = 'red-btn',
  blue = 'blue-btn',
  green = 'green-btn',
}

export enum AppBtnSize {
  small = 'small-btn',
  middle = 'middle-btn',
  big = 'big-btn',
}

interface IAppButtonProps {
  text?: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  size?: AppBtnSize;
  color?: AppBtnColor;
}

export const AppButton = ({
  text,
  onClick,
  disabled,
  size = AppBtnSize.middle,
  color = AppBtnColor.green,
}: IAppButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.AppButton} ${styles[size]} ${styles[color]}`}
      disabled={disabled}
    >
      {text || 'Отправить'}
    </button>
  );
};
