import React from 'react';
import {IUser} from "../../redux/Reducers/authReducer/authReducer";

interface IUserProps {
    user: IUser
}

export const User = ({user}: IUserProps) => {
    return (
        <div key={user.id}>
            <div>{user.email}</div>
            <div>{user.role}</div>
        </div>
    )
};