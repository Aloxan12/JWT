import React, { useState } from 'react';
import { useGetAllUsersQuery } from '../../../app/core/api/usersApi';
import { useParamsControl } from '../../../shared/lib/hooks/useParamsControl';
import { IUsersRequestDto } from '../../../app/core/api/dto/UserDto';
import { AppPagination } from '../../../shared/ui/AppPagination/AppPagination';
import { AppLoader } from '../../../widgets/AppLoader/AppLoader';
import { UserList } from './containers/UserList';
import { UsersFilter } from './containers/UsersFilter';

const UsersPage = () => {
  const [limit, setLimit] = useState(12);
  const params = useParamsControl<IUsersRequestDto, keyof IUsersRequestDto>({
    paramsList: ['search'],
    withPagination: true,
    resetPagination: true,
    limit,
  });

  const {
    data: users,
    isLoading: isLoadingList,
    isFetching: isFetchingList,
  } = useGetAllUsersQuery(params);

  return (
    <div>
      {(isFetchingList || isLoadingList) && <AppLoader />}
      <UsersFilter />
      <UserList users={users?.results} />
      {Boolean(users?.results.length) && (
        <AppPagination limit={limit} totalCount={users?.count} setLimit={setLimit} />
      )}
    </div>
  );
};

export default UsersPage;
