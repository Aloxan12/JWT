import React from 'react';
import styles from "../PersonalAccount.module.css";
import {RoleTypes} from "../../../router/AppRoute";
import {UserStatusContainer} from "./UserStatusContainer";
import {IUser} from "../../../redux/api/dto/UserDto";

interface IProfileInfoContainerProps{
    user: IUser
}

export const ProfileInfoContainer = ({user}:IProfileInfoContainerProps) => {
    const {email, isActivated, role} = user
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
            <UserStatusContainer user={user} />
        </div>
    );
};