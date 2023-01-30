import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserDetailQuery } from '../../redux/api/usersApi';
import styles from './Users.module.scss';
import fakeAvatar from '../../utils/images/fake_avatar.png';
import { RoleTypes } from '../../router/AppRoute';
import { AppLoader } from '../../Common/Components/AppLoader/AppLoader';

export const UserProfile = () => {
  const { id } = useParams();
  const {
    data: user,
    isLoading: isLoadingCurrent,
    isFetching: isFetchingCurrent,
  } = useGetUserDetailQuery({ id: id! }, { skip: !id });

  return (
    <div className={styles.UserProfileWrap}>
      {(isLoadingCurrent || isFetchingCurrent) && <AppLoader />}
      <div className={styles.UserProfileInfoWrap}>
        <div className={styles.UserProfilePhoto}>
          <img src={user && user.avatar ? user.avatar : fakeAvatar} alt={'avatar'} />
        </div>
        {!!user && (
          <div className={styles.UserProfileInfo}>
            <div>
              Email: <b>{user.email}</b>
            </div>
            <div>
              Роль: <b>{user.role === RoleTypes.ADMIN ? 'Администратор' : 'Пользователь'}</b>
            </div>
            <div>
              Статус: <b>{!!user.status ? user.status : 'Статус не установлен'}</b>
            </div>
          </div>
        )}
        {/*<div>посты</div>*/}
      </div>
    </div>
  );
};
