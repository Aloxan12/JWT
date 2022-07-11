import React, {useState} from 'react';
import {IUser} from "../../../redux/api/dto/UserDto";
import {useUpdateUserDetailMutation} from "../../../redux/api/usersApi";
import styles from "../PersonalAccount.module.css";
import {AppInput} from "../../../Common/Components/AppInput/AppInput";
import {Tooltip} from "../../../Common/Components/Tooltip/Tooltip";
import {AppButton} from "../../../Common/Components/AppButton/AppButton";

interface IUserStatusContainer{
    user: IUser
}

export const UserStatusContainer = ({user}: IUserStatusContainer) => {
    const [updateUserStatus] = useUpdateUserDetailMutation()

    const [editStatus, setEditStatus] = useState(false)
    const [status, setStatus] = useState('')

    const changeStatusHandler = () =>{
        updateUserStatus({id: user.id, data: {...user, status: status}})
        setEditStatus(false)
    }
    return (
        <div className={styles.PersonalAccountInfoItem}>
            <span className={styles.StatusBlock}>
                <span className={editStatus ? styles.LH_4 : '' }>Статус: </span> {editStatus
                ? <AppInput
                    value={status}
                    onChange={(value)=> setStatus(value)}
                />
                :(
                    <Tooltip content={`Чтобы ${!!user.status ? 'изменить' : 'ввести'} статус кликните дважы`}>
                        <b
                            onDoubleClick={()=> setEditStatus(prevState => !prevState)}
                        >{!!user.status ? user.status : 'Статуса нет'}</b>
                    </Tooltip>
                )
            }</span>
            {editStatus && <div className={styles.StatusBlockBtnWrap}>
                <AppButton onClick={()=>setEditStatus(false)} text={'Отмена'}/>
                <AppButton onClick={changeStatusHandler} text={'Сохранить'}/>
            </div>}
        </div>
    );
};