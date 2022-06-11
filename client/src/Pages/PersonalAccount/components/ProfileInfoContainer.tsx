import React from 'react';
import styles from "../PersonalAccount.module.css";
import {RoleTypes} from "../../../router/AppRoute";

interface IProfileInfoContainerProps{
    email:  string
    role:  RoleTypes
    isActivated:  boolean
}

export const ProfileInfoContainer = ({email, isActivated, role}:IProfileInfoContainerProps) => {
    return (
        <div className={styles.PersonalAccountInfoBlock}>
            <h3 className={styles.PersonalAccountInfoTitle}>Личная информация</h3>
            <div className={styles.PersonalAccountInfoItem}>
                <span>Email: <b>{email}</b></span>
            </div>
            <div className={styles.PersonalAccountInfoItem}>
                <span>Роль: <b>{role === RoleTypes.ADMIN ? 'Администратор' : 'Пользователь'}</b></span>
            </div>
            <div className={styles.PersonalAccountInfoItem}>
                <span>Активирован: <b>{isActivated ? 'Да' : 'Нет'}</b></span>
            </div>
        </div>
    );
};