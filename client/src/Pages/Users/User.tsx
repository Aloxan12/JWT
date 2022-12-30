import React from 'react';
import styles from './Users.module.css';
import fakeAvatar from '../../utils/images/fake_avatar.png';
import { IUser } from '../../redux/api/dto/UserDto';
import { host } from '../../redux/api/authApi';

interface IUserProps {
  user: IUser;
}

export const User = ({ user }: IUserProps) => {
  return (
    <div key={user.id} className={styles.UserItem}>
      <div className={styles.UserPhotoBlock}>
        <img src={!!user.avatar ? host + user.avatar : fakeAvatar} alt={'avatar'} loading="eager" />
      </div>
      <div>{user.email}</div>
      <div>Роль: {!!user.role ? user.role : 'Без роли'}</div>
    </div>
  );
};
