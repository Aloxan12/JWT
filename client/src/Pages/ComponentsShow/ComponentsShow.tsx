import React from 'react';
import {AppButton} from "../../Common/Components/AppButton/AppButton";
import {AppTrash} from "../../Common/Components/AppTrash/AppTrash";
import styles from './ComponentsShow.module.css'

export const ComponentsShow = () => {
    return (
        <div className={styles.ComponentsShowWrapper}>
            <AppButton onClick={(e)=> console.log(e.currentTarget)} />
            <AppTrash deleteHandler={()=>console.log('что-то удалил')} />
        </div>
    );
};