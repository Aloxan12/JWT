import React, { useState } from 'react';
import { useGetAllUsersQuery } from '../../../app/core/api/usersApi';
import { User } from './components/User';
import cls from './Users.module.scss';
import '../../../app/App.scss';
import { useParamsControl } from '../../../shared/lib/hooks/useParamsControl';
import { IUsersRequestDto } from '../../../app/core/api/dto/UserDto';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/core/redux/store';
import { AppPagination } from '../../../shared/ui/AppPagination/AppPagination';
import { AppLoader } from '../../../widgets/AppLoader/AppLoader';
import { AppInputFilter } from '../../../features/AppInputFilter/AppInputFilter';

const UsersPage = () => {
  const [limit, setLimit] = useState(10);
  const params = useParamsControl<IUsersRequestDto, keyof IUsersRequestDto>({
    paramsList: ['search'],
    withPagination: true,
    resetPagination: true,
    limit,
  });

  const currentUser = useSelector((state: RootState) => state.auth.user);
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
      <div className={cls.usersList}>
        {users && currentUser && users.results.map((user) => <User user={user} key={user.id} />)}
      </div>
      {users && users.results.length > 0 && (
        <AppPagination limit={limit} totalCount={!!users ? users.count : 0} setLimit={setLimit} />
      )}
    </div>
  );
};

export default UsersPage;
