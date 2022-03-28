import React from 'react';
import styles from './NotFound.module.css'
import paper from '../../utils/images/paper.png'

const arrNotFoundText = [
    'page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404',
    'page not found 404 page not found 404 page not error error 404 404 404 404 404 404 error error found 404 page not found 404 page not found 404 page not found 404',
    'error page not found error page not found error page not found e404 404 404 404 404 404 404 not found error page not found',
    '404 404 404 404 404 404 404 page not found 404 404 404 404 404 404 404 404 404 404 404 404 404 404 404 404 404 404 404 error error error error 404 404 404 404 error error error error 404 404 404 404 404 404 404 404 ',
    'page not found 404 page not found 404 page not found 404  404 404 404 404 404 404 404 page not found 404 page not found 404 page not found 404',
    'error error error error error error page not found 404 page not found error error error 404 page not found 404 page not found 404 page not found 404 page not found 404',
    '404 404 404 404 404 404 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404',
    'found error page not found error 404 404 404 404 404 404 404 page not found error 404 404 404 404 404 404 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404',
    'page not found 404 page not found 404 page not found 404  404 404 404 404 404 404 404 404 404 404 404 404 404 404 page not found 404 page not found 404 page not found 404 404 404 404 404 404 404 404',
    '  404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404',
    '404 page not found 404 page not found 404 page not found 404 page not 404 page not found 404 found 404 page not found 404 page not found 404',
    'error error page not found 404 page not found 404 page not found 404 page not found 404 404 404 404 404 404 404 404 page not found 404 page not found 404',
    '404 page not found 404 404 404 404 404 404 404 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404',
    'page not found 404 page not found 404 page not found 404 page not found 404 404 page not found 404 page not found 404 page not found 404',
    'error 404 error page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page 404 404 404 404 404 404 404 not found 404',
    ' 404 page not found 404 page not found 404 page not found 404 page not found 404 404 page 404 page not found 404 404 404 404 404 404 404 404 not found 404 page not found 404 page not found 404 page not found 404',
]

export const NotFound = () => {
    return (
        <div className={styles.NotFoundWrap}>
            <img src={paper} alt={'not found'}/>
            {/*<div className={styles.NotFoundText}>404</div>*/}
            <div className={styles.runningStringBlock}>
                {arrNotFoundText.map((item, i) => <div>
                    <span key={`not found key ${i}`}>{item}</span>
                </div>)}
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