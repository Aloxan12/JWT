import React from 'react';
import cls from '../Users.module.scss';
import { IUser } from '../../../../app/core/api/dto/UserDto';
import { Tooltip } from '../../../../shared/ui/Tooltip/Tooltip';
import { AppPhoto } from '../../../../shared/ui/AppPhoto/AppPhoto';
import avatarFake from '../../../../shared/assets/images/fake_avatar.png';

interface IUserProps {
  user: IUser;
}

export const User = ({ user }: IUserProps) => {
  return (
    <div key={user.id} className={cls.userItem}>
      <div className={cls.userPhotoBlock}>
        <AppPhoto src={user.avatar || avatarFake} alt={'avatar'} />
      </div>
      <Tooltip content={user.email}>
        <div className={cls.UserEmailBlock}>{user.email}</div>
      </Tooltip>
      <div>Роль: {!!user.role ? user.role : 'Без роли'}</div>
    </div>
  );
};
