import React, { useState } from 'react';
import { IUser } from '../../../app/core/api/dto/UserDto';
import { useUpdateUserDetailMutation } from '../../../app/core/api/usersApi';
import styles from '../PersonalAccount.module.scss';
import { AppButton } from '../../../shared/ui/AppButton/AppButton';
import { AppInput } from '../../../shared/ui/AppInput/AppInput';
import { Tooltip } from '../../../shared/ui/Tooltip/Tooltip';

interface IUserStatusContainer {
  user: IUser;
}

export const UserStatusContainer = ({ user }: IUserStatusContainer) => {
  const [updateUserStatus] = useUpdateUserDetailMutation();

  const [editStatus, setEditStatus] = useState(false);
  const [status, setStatus] = useState(!!user.status ? user.status : '');

  const changeStatusHandler = () => {
    updateUserStatus({ id: user.id, data: { ...user, status: status } });
    setEditStatus(false);
  };
  return (
    <div className={styles.PersonalAccountInfoItem}>
      <span className={styles.StatusBlock}>
        <span className={editStatus ? styles.LH_4 : ''}>Статус: </span>{' '}
        {editStatus ? (
          <AppInput value={status} onChange={(value) => setStatus(value)} />
        ) : (
          <Tooltip content={`Чтобы ${!!user.status ? 'изменить' : 'ввести'} статус кликните дважы`}>
            <b onDoubleClick={() => setEditStatus((prevState) => !prevState)}>
              {!!user.status ? user.status : 'Статуса нет'}
            </b>
          </Tooltip>
        )}
      </span>
      {editStatus && (
        <div className={styles.StatusBlockBtnWrap}>
          <AppButton onClick={() => setEditStatus(false)} text={'Отмена'} />
          <AppButton onClick={changeStatusHandler} text={'Сохранить'} />
        </div>
      )}
    </div>
  );
};
