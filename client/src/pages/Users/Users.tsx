import React, { useState } from 'react';
import { useGetAllUsersQuery } from '../../app/core/api/usersApi';
import { User } from './User';
import styles from './Users.module.scss';
import '../../app/App.scss';
import { useParamsControl } from '../../shared/lib/hooks/useParamsControl';
import { IUsersRequestDto } from '../../app/core/api/dto/UserDto';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/core/redux/store';
import { useIsAdmin } from '../../utils/helpers';
import { NavLink } from 'react-router-dom';
import { AppPagination } from '../../shared/ui/AppPagination/AppPagination';
import { AppLoader } from '../../widgets/AppLoader/AppLoader';
import { AppInputFilter } from '../../features/AppInputFilter/AppInputFilter';

export const Users = () => {
  const [limit, setLimit] = useState(10);
  const params = useParamsControl<IUsersRequestDto, keyof IUsersRequestDto>({
    paramsList: ['search'],
    withPagination: true,
    resetPagination: true,
    limit,
  });

  const currentUser = useSelector((state: RootState) => state.auth.user);
  const isAdmin = useIsAdmin(!!currentUser ? currentUser.role : undefined);
  const {
    data: users,
    isLoading: isLoadingList,
    isFetching: isFetchingList,
  } = useGetAllUsersQuery(params);

  return (
    <div>
      {(isFetchingList || isLoadingList) && <AppLoader />}
      <div className={''}>
        <AppInputFilter
          searchParam="search"
          placeholder={'Введите email'}
          label={'Поиск по email'}
        />
      </div>
      <div className={styles.UsersBlock}>
        {users &&
          currentUser &&
          users.results.map((user) => {
            if (isAdmin) {
              return (
                <NavLink
                  to={
                    user.id === currentUser.id ? `/currentUser/${user.id}/` : `/users/${user.id}/`
                  }
                  className={styles.UserBlock}
                  key={user.id}
                >
                  <User user={user} />
                </NavLink>
              );
            } else {
              return (
                <div className={styles.UserBlock} key={user.id}>
                  <User user={user} />
                </div>
              );
            }
          })}
      </div>
      {users && users.results.length > 0 && (
        <AppPagination limit={limit} totalCount={!!users ? users.count : 0} setLimit={setLimit} />
      )}
    </div>
  );
};
