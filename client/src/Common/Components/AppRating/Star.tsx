import React from 'react';
import styles from './Star.module.css'

interface IStar {
    active: boolean
    value: number
    onChange: (value: number) => void
}

export const Star = ({active, onChange, value}: IStar) => {
    return (
        <div className={styles.wrap}>
            <div className={styles.wrapStar}>
                <span
                    className={`${styles.star} ${active ? styles.active : ''}`}
                    onClick={() => onChange(value)}
                >
                </span>
            </div>
        </div>
    );
};