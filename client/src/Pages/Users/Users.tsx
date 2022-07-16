import React from 'react';
import {useGetAllUsersQuery} from "../../redux/api/usersApi";
import {User} from "./User";
import styles from './Users.module.css'
import {AppInputFilter} from "../../Common/Components/AppInputFilter";
import commonStyles from '../../App.module.css'
import {useParamsControl} from "../../Hooks/useParamsControl";
import {IUsersRequestDto} from "../../redux/api/dto/UserDto";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {useIsAdmin} from "../../utils/helpers";
import {NavLink} from "react-router-dom";
import {AppPagination} from "../../Common/Components/AppPagination/AppPagination";

export const Users = () => {
    const params = useParamsControl<IUsersRequestDto, keyof IUsersRequestDto>(
        {
            paramsList: ['search'], withPagination: true, resetPagination: true
        })

    const currentUser = useSelector((state: RootState) => state.auth.user)
    const isAdmin = useIsAdmin(!!currentUser ? currentUser.role : undefined)
    const {data: users} = useGetAllUsersQuery(params)



    return (
        <div>
            <div className={commonStyles.FilterBlock}>
                <AppInputFilter searchParam='search' placeholder={'Введите email'} label={'Поиск по email'}/>
            </div>
            <div className={styles.UsersBlock}>
                {users && users.results.map(user => {
                    if (isAdmin) {
                        return (
                            <NavLink to={`/users/${user.id}/`} className={styles.UserLink} key={user.id}>
                                <User user={user}/>
                            </NavLink>
                        )
                    } else {
                        return <User user={user} key={user.id}/>
                    }
                })}
            </div>
            {/*<AppPagination limit={10} totalCount={!!users ? users.results.length : 0} />*/}
        </div>
    );
};