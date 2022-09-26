import React from 'react';
import styles from './Star.module.css';

interface IStar {
  active: boolean;
  value: number;
  onChange: (value: number) => void;
  setHelpText: (value: number | null) => void;
}

export const Star = ({ active, onChange, setHelpText, value }: IStar) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.wrapStar}>
        <span
          className={`${styles.star} ${active ? styles.active : ''}`}
          onClick={() => onChange(value)}
          onMouseEnter={() => setHelpText(value)}
          onMouseLeave={() => setHelpText(null)}
        ></span>
      </div>
    </div>
  );
};
