import React from 'react';
import styles from './Star.module.css'

interface IStar{
    active: boolean
}

export const Star = ({active}: IStar) => {
    return (
        <div className={styles.wrap}>
            <span className={`${styles.star} ${active ? styles.active : ''}`}>
        </span>
        </div>
    );
};