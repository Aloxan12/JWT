import React from 'react';
import {IUser} from "../../redux/Reducers/authReducer/authReducer";
import styles from './Users.module.css'


interface IUserProps {
    user: IUser
}

export const User = ({user}: IUserProps) => {
    return (
        <div key={user.id} className={styles.UserItem}>
            <div>{user.email}</div>
            <div>{user.role}</div>
        </div>
    )
};