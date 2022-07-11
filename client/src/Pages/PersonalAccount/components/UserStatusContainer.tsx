import React from 'react';
import {IUser} from "../../../redux/api/dto/UserDto";
import {useUpdateUserDetailMutation} from "../../../redux/api/usersApi";

interface IUserStatusContainer{
    user: IUser
}

export const UserStatusContainer = ({user}: IUserStatusContainer) => {
    const [updateUserStatus] = useUpdateUserDetailMutation()
    return (
        <div>

        </div>
    );
};