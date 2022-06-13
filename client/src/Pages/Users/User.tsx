import React from 'react';
import {IUser} from "../../redux/Reducers/authReducer/authReducer";
import styles from './Users.module.css'
import fakeAvatar from '../../utils/images/fake_avatar.png'


interface IUserProps {
    user: IUser
}

export const User = ({user}: IUserProps) => {
    return (
        <div key={user.id} className={styles.UserItem}>
            <div className={styles.UserPhotoBlock}>
                <img src={!!user.avatar ? `http://localhost:5555/` + user.avatar : fakeAvatar}/>
            </div>
            <div>{user.email}</div>
            <div>{user.role}</div>
        </div>
    )
};