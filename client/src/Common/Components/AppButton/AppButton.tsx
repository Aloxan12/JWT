import React, { MouseEvent } from 'react';
import styles from './AppButton.module.css';

interface IAppButtonProps {
  text?: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export const AppButton = ({ text, onClick, disabled }: IAppButtonProps) => {
  return (
    <button onClick={onClick} className={styles.AppButton} disabled={disabled}>
      {text || 'Отправить'}
    </button>
  );
};
