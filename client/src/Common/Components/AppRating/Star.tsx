import React from 'react';
import styles from './Star.module.css'

interface IStar{
    active: boolean
}

export const Star = ({active}: IStar) => {
    return (
            <div className={styles.wrap}>
                <div className={styles.wrapStar}>
                <span className={`${styles.star} ${active ? styles.active : ''}`}>
                </span>
                </div>
            </div>
    );
};