import React, {useState} from 'react';
import {IUser} from "../../../redux/api/dto/UserDto";
import {useUpdateUserDetailMutation} from "../../../redux/api/usersApi";
import styles from "../PersonalAccount.module.css";
import {AppInput} from "../../../Common/Components/AppInput/AppInput";
import {Tooltip} from "../../../Common/Components/Tooltip/Tooltip";

interface IUserStatusContainer{
    user: IUser
}

export const UserStatusContainer = ({user}: IUserStatusContainer) => {
    const [updateUserStatus] = useUpdateUserDetailMutation()

    const [editStatus, setEditStatus] = useState(false)
    const [status, setStatus] = useState('')
    return (
        <div className={styles.PersonalAccountInfoItem}>
            <span className={styles.StatusBlock}>
                <span className={editStatus ? styles.LH_4 :''}>Статус:</span> {editStatus
                ? <AppInput
                    value={status}
                    onChange={(value)=> setStatus(value)}
                />
                :(
                    <Tooltip content={`Чтобы ${!!user.status ? 'изменить' : 'ввети'} статус кликните дважы`}>
                        <b
                            onDoubleClick={()=> setEditStatus(prevState => !prevState)}
                        >{!!user.status ? user.status : 'Статуса нет'}</b>
                    </Tooltip>
                )
            }</span>
        </div>
    );
};