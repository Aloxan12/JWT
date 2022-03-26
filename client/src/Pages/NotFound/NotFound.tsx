import React from 'react';
import styles from './NotFound.module.css'
import paper from '../../utils/images/paper.png'
import {AppButton} from "../../Common/Components/AppButton/AppButton";

export const NotFound = () => {
    return (
        <div className={styles.NotFoundWrap}>
            <img src={paper} alt={'not found'}/>
            <div>404</div>
            <div className={styles.onGoMainBtn}>
                <AppButton onClick={()=>{}} text='На главную'/>
            </div>
            <div className={styles.onClosesBtn}>
                <AppButton onClick={()=>{}} text='Закрыть вкладку'/>
            </div>
        </div>
    );
};