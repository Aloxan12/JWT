import React from 'react';
import styles from './PersonalAccount.module.css'
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {RoleTypes} from "../../router/AppRoute";
import {AppButton} from "../../Common/Components/AppButton/AppButton";

export const PersonalAccount = () => {
    const {id} = useParams()
    const user = useSelector((state:RootState) => state.auth.authData.user)
    return (
        <div className={styles.PersonalAccountWrap}>
            <div className={styles.PersonalAccountMainBlock}>
                <div className={styles.PersonalAccountPhotoBlock}>
                    <img
                        className={styles.PersonalAccountPhoto}
                        src={user!.avatar ? `http://localhost:5555/` + user!.avatar : 'фейк'}/>
                    <div className={styles.ChangePhotoBtn}>
                        <AppButton
                            onClick={()=>{}} text={'Сменить фото'} />
                    </div>
                </div>
                <div className={styles.PersonalAccountInfoBlock}>
                    <h3 className={styles.PersonalAccountInfoTitle}>Личная информация</h3>
                    <div className={styles.PersonalAccountInfoItem}>
                        <span>Email: <b>{user?.email}</b></span>
                    </div>
                    <div className={styles.PersonalAccountInfoItem}>
                        <span>Роль: <b>{user?.role === RoleTypes.ADMIN ? 'Администратор' : 'Пользователь'}</b></span>
                    </div>
                    <div className={styles.PersonalAccountInfoItem}>
                        <span>Активирован: <b>{user?.isActivated ? 'Да' : 'Нет'}</b></span>
                    </div>
                </div>
            </div>
        </div>
    );
};
