import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';
import { Link, NavLink, useMatch, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/core/redux/store';
import { useLogoutMutation, useRefreshTokenQuery } from '../../app/core/api/authApi';
import { logout } from '../../app/core/redux/Reducers/authReducer/authReducer';
import fakeAvatar from '../../utils/images/fake_avatar.png';
import { AppLoader } from '../../Common/Components/AppLoader/AppLoader';
import { Sidebar } from '../Sidebar/Sidebar';

export const Header = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, token: isAuth } = useAppSelector((state) => state.auth);
  const [logoutApi] = useLogoutMutation();
  const { data: refreshTokenData } = useRefreshTokenQuery(null, {
    refetchOnMountOrArgChange: true,
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [menuActive, setMenuActive] = useState(false);
  const isSameUrl = !!useMatch('login');

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
    } else {
      if (isSameUrl) {
        navigate('/');
      }
    }
  }, [isAuth]);
  console.log('men');
  console.log('refreshTokenData', refreshTokenData);

  // useEffect(() => {
  //   try {
  //     if (localStorage.getItem('token')) {
  //       setIsLoading(true);
  //       checkAuthApi()
  //         .then((data) => {
  //           if (data) {
  //             localStorage.setItem('token', data.accessToken);
  //             dispatch(setIsAuth(true));
  //             dispatch(setAuthData(data));
  //             dispatch(setUser(data.user));
  //           }
  //         })
  //         .finally(() => setIsLoading(false));
  //     } else {
  //       dispatch(setAuthData({ user: null, accessToken: null, refreshToken: null }));
  //       dispatch(setUser(null));
  //     }
  //   } catch (e) {}
  // }, [isAuth]);

  const logoutHandler = async () => {
    await logoutApi();
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className={styles.mainHeaderWrap}>
      {isLoading && <AppLoader />}
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
      <Sidebar />
      {/*{isAuth && (*/}
      {/*  <nav>*/}
      {/*    <div*/}
      {/*      className={styles.burgerBtn}*/}
      {/*      onClick={() => setMenuActive((prevState) => !prevState)}*/}
      {/*    >*/}
      {/*      <span />*/}
      {/*    </div>*/}
      {/*  </nav>*/}
      {/*)}*/}
      {/*<BurgerMenu active={menuActive} setActive={setMenuActive} header="Меню" items={itemsRoute} />*/}
    </div>
  );
};
