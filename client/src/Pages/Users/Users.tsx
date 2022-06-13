import React from 'react';
import {useGetAllUsersQuery} from "../../redux/usersApi";
import {User} from "./User";
import styles from './Users.module.css'

export const Users = () => {
    const {data: users} = useGetAllUsersQuery({search: 'kva'})
    return (
        <div>
            <div className={styles.UsersBlock}>
                {users && users.map(user =>{
                    return <User user={user} />
                })}
            </div>
        </div>
    );
};