import React, { useEffect } from 'react';
import styles from './Header.module.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/core/redux/store';
import { useLogoutMutation, useRefreshTokenQuery } from '../../app/core/api/authApi';
import { logout, setAuthData } from '../../app/core/redux/Reducers/auth/authSlice';
import fakeAvatar from '../../utils/images/fake_avatar.png';
import { Sidebar } from '../Sidebar/Sidebar';

export const Header = () => {
  const { user, token: isAuth } = useAppSelector((state) => state.auth);
  const [logoutApi] = useLogoutMutation();
  const { data: refreshTokenData } = useRefreshTokenQuery();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (refreshTokenData) {
      dispatch(setAuthData(refreshTokenData));
    }
  }, [refreshTokenData, setAuthData, dispatch]);

  const logoutHandler = async () => {
    await logoutApi();
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className={styles.mainHeaderWrap}>
      <Sidebar />
      <div className={styles.mainHeaderTitle}>Название сайта</div>
      <div className={styles.mainHeaderAuth}>
        {user ? (
          <div className={styles.mainHeaderIsAuth}>
            <div className={styles.welcomeWrap}>
              <span className={styles.email}>{user.email}</span>
              <Link to={`currentUser/${user.id}`} className={styles.linkAva}>
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
        ) : (
          <div className={styles.mainHeaderIsLogout}>
            <NavLink className={styles.loginLink} to={'/login'}>
              Войти
            </NavLink>
            <NavLink className={styles.loginLink} to={'/registration'}>
              Регистрация
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};
