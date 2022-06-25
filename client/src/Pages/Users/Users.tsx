import React from 'react';
import {useGetAllUsersQuery} from "../../redux/usersApi";
import {User} from "./User";
import styles from './Users.module.css'
import {AppInputFilter} from "../../Common/Components/AppInputFilter";
import {useSearchParams} from "react-router-dom";
import commonStyles from '../../App.module.css'

export const Users = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const {data: users} = useGetAllUsersQuery(searchParams.get('search') ? {search: searchParams.get('search')} : null)

    return (
        <div>
            <div className={commonStyles.FilterBlock}>
                <AppInputFilter searchParam='search' placeholder={'Введите email'} label={'Поиск'}/>
            </div>
            <div className={styles.UsersBlock}>
                {users && users.map(user =>{
                    return <User user={user} />
                })}
            </div>
        </div>
    );
};