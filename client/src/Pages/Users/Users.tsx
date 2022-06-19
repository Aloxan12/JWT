import React from 'react';
import {useGetAllUsersQuery} from "../../redux/usersApi";
import {User} from "./User";
import styles from './Users.module.css'
import {AppInputFilter} from "../../Common/Components/AppInputFilter";

export const Users = () => {
    const {data: users} = useGetAllUsersQuery()
    return (
        <div>
            <div>
                <AppInputFilter searchParam='search' />
            </div>
            <div className={styles.UsersBlock}>
                {users && users.map(user =>{
                    return <User user={user} />
                })}
            </div>
        </div>
    );
};