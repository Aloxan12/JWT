import React from 'react';
import styles from './AppLoader.module.css';

export const AppLoader = () => {
  return (
    <div className={styles.loaderWrap}>
      <div className={styles.ldsRoller}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};
