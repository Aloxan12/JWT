import React from 'react';
import cls from '../Users.module.scss';
import { User } from '../components/User';
import { IUser } from '../../../../app/core/api/dto/UserDto';

interface UserListProps {
  users?: IUser[];
}

export const UserList = ({ users }: UserListProps) => {
  if (!users?.length) return <div>Пользователи не найдены</div>;
  return (
    <div className={cls.usersList}>
      {users.map((user) => (
        <User user={user} key={user.id} />
      ))}
    </div>
  );
};
