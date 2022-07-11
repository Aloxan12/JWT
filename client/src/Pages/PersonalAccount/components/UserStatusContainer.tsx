import React, {useState} from 'react';
import {IUser} from "../../../redux/api/dto/UserDto";
import {useUpdateUserDetailMutation} from "../../../redux/api/usersApi";
import styles from "../PersonalAccount.module.css";
import {AppInput} from "../../../Common/Components/AppInput/AppInput";

interface IUserStatusContainer{
    user: IUser
}

export const UserStatusContainer = ({user}: IUserStatusContainer) => {
    const [updateUserStatus] = useUpdateUserDetailMutation()

    const [editStatus, setEditStatus] = useState(false)
    const [status, setStatus] = useState('')
    return (
        <div className={styles.PersonalAccountInfoItem}>
            <span>Статус: {editStatus
                ? <AppInput onChange={(value)=> setStatus(value)} />
                : <b>{!!user.status ? user.status : 'Статуса нет'}</b>}</span>
        </div>
    );
};