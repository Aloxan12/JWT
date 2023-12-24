import React, { useEffect } from 'react';
import styles from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/core/redux/store';
import { useRefreshTokenQuery } from '../../app/core/api/authApi';
import { setAuthData } from '../../app/core/redux/Reducers/auth/authSlice';
import fakeAvatar from '../../utils/images/fake_avatar.png';
import { Sidebar } from '../Sidebar/ui/Sidebar/Sidebar';

export const Header = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: refreshTokenData } = useRefreshTokenQuery();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (refreshTokenData) {
      dispatch(setAuthData(refreshTokenData));
    }
  }, [refreshTokenData, setAuthData, dispatch]);

  const logoutHandler = () => {
    navigate('/logout');
  };

  return (
    <div className={styles.mainHeaderWrap}>
      <Sidebar />
      <div className={styles.mainHeaderTitle}>Название сайта</div>
      <div className={styles.mainHeaderAuth}>
        <div className={styles.mainHeaderIsAuth}>
          <div className={styles.welcomeWrap}>
            <span className={styles.email}>{user?.email}</span>
            <Link to={`currentUser/${user?.id}`} className={styles.linkAva}>
              <img
                src={!!user!.avatar ? user!.avatar : fakeAvatar}
                className={styles.AvatarImg}
                alt={'avatar'}
              />
            </Link>
          </div>
          <span>
            <a className={styles.loginLink} onClick={logoutHandler}>
              Выйти
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};
