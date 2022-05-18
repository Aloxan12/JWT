import React from 'react';
import styles from './PersonalAccount.module.css'
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {RoleTypes} from "../../router/AppRoute";

export const PersonalAccount = () => {
    const {id} = useParams()
    const user = useSelector((state:RootState) => state.auth.authData.user)
    return (
        <div className={styles.PersonalAccountWrap}>
            <div className={styles.PersonalAccountMainBlock}>
                <div><img src={user!.avatar ? `http://localhost:5555/` + user!.avatar : 'фейк'}/></div>
                <div className={styles.PersonalAccountInfoBlock}>
                    <h3>Личная информация</h3>
                    <div>
                        <span>Email: <b>{user?.email}</b></span>
                    </div>
                    <div>
                        <span>Роль: <b>{user?.role === RoleTypes.ADMIN ? 'Администратор' : 'Пользователь'}</b></span>
                    </div>
                    <div>
                        <span>Активирован: <b>{user?.isActivated ? 'Да' : 'Нет'}</b></span>
                    </div>
                </div>
            </div>
        </div>
    );
};
