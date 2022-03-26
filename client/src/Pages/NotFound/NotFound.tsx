import React from 'react';
import styles from './NotFound.module.css'
import paper from '../../utils/images/paper.png'
import {AppButton} from "../../Common/Components/AppButton/AppButton";
import {MatrixRain} from "./MatrixRain";

export const NotFound = () => {
    return (
        <div className={styles.NotFoundWrap}>
            <img src={paper} alt={'not found'}/>
            <div className={styles.NotFoundText}>404</div>
            <MatrixRain />
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