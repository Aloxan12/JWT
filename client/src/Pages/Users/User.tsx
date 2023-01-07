import React from 'react';
import styles from './Users.module.css';
import fakeAvatar from '../../utils/images/fake_avatar.png';
import { IUser } from '../../redux/api/dto/UserDto';
import { Tooltip } from '../../Common/Components/Tooltip/Tooltip';

interface IUserProps {
  user: IUser;
}

export const User = ({ user }: IUserProps) => {
  return (
    <div key={user.id} className={styles.UserItem}>
      <div className={styles.UserPhotoBlock}>
        <img src={!!user.avatar ? user.avatar : fakeAvatar} alt={'avatar'} loading="eager" />
      </div>
      <Tooltip content={user.email}>
        <div className={styles.UserEmailBlock}>{user.email}</div>
      </Tooltip>
      <div>Роль: {!!user.role ? user.role : 'Без роли'}</div>
    </div>
  );
};
