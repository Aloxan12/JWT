import React, { MouseEvent } from 'react';
import styles from './AppButton.module.scss';

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
}

export const AppButton = ({
  text,
  onClick,
  disabled,
  size = AppBtnSize.middle,
}: IAppButtonProps) => {
  return (
    <button onClick={onClick} className={`${styles.AppButton} ${styles[size]}`} disabled={disabled}>
      {text || 'Отправить'}
    </button>
  );
};
