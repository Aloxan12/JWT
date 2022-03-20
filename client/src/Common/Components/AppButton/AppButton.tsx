import React, {MouseEvent} from 'react';
import styles from './AppButton.module.css'

interface IAppButtonProps{
    text?: string
    onClick:(e: MouseEvent<HTMLButtonElement>)=> void
}

export const AppButton = ({text, onClick}: IAppButtonProps) => {
    return (
        <button onClick={onClick} className={styles.AppButton}>
            {text || 'Отправить'}
        </button>
    );
};