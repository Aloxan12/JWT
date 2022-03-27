import React from 'react';
import styles from './NotFound.module.css'
import paper from '../../utils/images/paper.png'

export const NotFound = () => {
    return (
        <div className={styles.NotFoundWrap}>
            <img src={paper} alt={'not found'}/>
            {/*<div className={styles.NotFoundText}>404</div>*/}
            <div className={styles.runningStringBlock}>
                <div>
                    <span>page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404</span>
                </div>
                <div>
                    <span>not found 404</span>
                </div>
            </div>
            <div className={styles.onGoMainBtn}>
                <div className={styles.redTablet}>
                </div>
            </div>
            <div className={styles.onClosesBtn}>
                <div className={styles.blueTablet}>
                </div>
            </div>
        </div>
    );
};