import React from 'react';
import {useGetAllUsersQuery} from "../../redux/usersApi";

export const Users = () => {
    const {data: users} = useGetAllUsersQuery()
    console.log('users', users)
    return (
        <div>
            {users && users.map(user =>{
                return <div key={user.id}>
                    <div>{user.email}</div>
                    <div>{user.role}</div>
                </div>
            })}
        </div>
    );
};