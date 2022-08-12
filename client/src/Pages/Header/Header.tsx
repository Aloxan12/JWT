import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';
import { NavLink, Link, useMatch, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { useLogoutMutation } from '../../redux/api/authApi';
import {
  logout,
  setAuthData,
  setIsAuth,
  setUser,
} from '../../redux/Reducers/authReducer/authReducer';
import { BurgerMenu } from '../../Common/Components/BurgerMenu/BurgerMenu';
import { checkAuthApi } from '../../redux/api/checkAuthApi';
import { IRouteObj } from '../../router/AppRoute';
import fakeAvatar from '../../utils/images/fake_avatar.png';
import { IUser } from '../../redux/api/dto/UserDto';

interface IHeader {
  itemsRoute: IRouteObj[];
}

export const Header = ({ itemsRoute }: IHeader) => {
  const user = useSelector<RootState, IUser | null>((state) => state.auth.user);
  const isAuth = useSelector<RootState, boolean>((state) => state.auth.isAuth);
  const [logoutApi] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [menuActive, setMenuActive] = useState(false);
  const isSameUrl = !!useMatch('login');

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    } else {
      if (isSameUrl) {
        navigate('/');
      }
    }
  }, [isAuth]);

  useEffect(() => {
    try {
      if (localStorage.getItem('token')) {
        checkAuthApi().then((data) => {
          if (data) {
            localStorage.setItem('token', data.accessToken);
            dispatch(setIsAuth(true));
            dispatch(setAuthData(data));
            dispatch(setUser(data.user));
          }
        });
      } else {
        dispatch(setAuthData({ user: null, accessToken: null, refreshToken: null }));
        dispatch(setUser(null));
      }
    } catch (e) {}
  }, [isAuth]);

  const logoutHandler = async () => {
    await logoutApi();
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className={styles.mainHeaderWrap}>
      <div className={styles.mainHeaderTitle}>Название сайта</div>
      <div className={styles.mainHeaderAuth}>
        {user ? (
          <div className={styles.mainHeaderIsAuth}>
            <span className={styles.welcomeWrap}>
              {user.email}
              <Link to={`currentUser/${user.id}`} className={styles.linkAva}>
                <img
                  src={!!user!.avatar ? `http://localhost:5555/` + user!.avatar : fakeAvatar}
                  alt={'avatar'}
                />
              </Link>
            </span>
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
              Регитсрация
            </NavLink>
          </div>
        )}
      </div>
      {isAuth && (
        <nav>
          <div
            className={styles.burgerBtn}
            onClick={() => setMenuActive((prevState) => !prevState)}
          >
            <span />
          </div>
        </nav>
      )}
      <BurgerMenu
        active={menuActive}
        setActive={setMenuActive}
        header="Меню"
        items={itemsRoute.filter((item) => item.showInMenu)}
      />
    </div>
  );
};
