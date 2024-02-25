import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserDetailQuery } from '../../../../app/core/api/usersApi';
import styles from '../Users.module.scss';
import fakeAvatar from '../../../../shared/assets/images/fake_avatar.png';
import { RoleTypes } from '../../../../app/core/router/AppRouter';
import { AppLoader } from '../../../../widgets/AppLoader/AppLoader';
import { AppPhoto } from '../../../../shared/ui/AppPhoto/AppPhoto';

export const UserProfile = () => {
  const { userId } = useParams();
  const {
    data: user,
    isLoading: isLoadingCurrent,
    isFetching: isFetchingCurrent,
  } = useGetUserDetailQuery({ id: userId! }, { skip: !userId });

  return (
    <div className={styles.UserProfileWrap}>
      {(isLoadingCurrent || isFetchingCurrent) && <AppLoader />}
      <div className={styles.UserProfileInfoWrap}>
        <div className={styles.UserProfilePhoto}>
          <AppPhoto
            src={user?.avatar || fakeAvatar}
            alt="avatar"
            width={340}
            height={300}
            radius="12"
          />
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
      </div>
    </div>
  );
};
