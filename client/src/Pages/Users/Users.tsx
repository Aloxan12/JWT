import React from 'react';
import {useGetAllUsersQuery} from "../../redux/usersApi";

export const Users = () => {
    const {data: users} = useGetAllUsersQuery()
    console.log('users', users)
    return (
        <div>

        </div>
    );
};