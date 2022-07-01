import React from 'react';
import {useGetAllUsersQuery} from "../../redux/api/usersApi";
import {User} from "./User";
import styles from './Users.module.css'
import {AppInputFilter} from "../../Common/Components/AppInputFilter";
import commonStyles from '../../App.module.css'
import {useParamsControl} from "../../Hooks/useParamsControl";
import {IUsersRequestDto} from "../../redux/api/dto/UserDto";

export const Users = () => {
    const params = useParamsControl<IUsersRequestDto, keyof IUsersRequestDto>(
        {
            paramsList: ['search'], withPagination: false
        })
    const {data: users} = useGetAllUsersQuery(params)

    return (
        <div>
            <div className={commonStyles.FilterBlock}>
                <AppInputFilter searchParam='search' placeholder={'Введите email'} label={'Поиск по email'}/>
            </div>
            <div className={styles.UsersBlock}>
                {users && users.map(user => {
                    return <User user={user}/>
                })}
            </div>
        </div>
    );
};