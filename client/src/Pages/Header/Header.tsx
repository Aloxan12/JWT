import React, {useEffect} from "react";
import styles from './Header.module.css'
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../redux/store";
import {IUserAuthState, useCheckAuthQuery} from "../../redux/authApi";
import {logout, setAuthData, setToken} from "../../redux/Reducers/authReducer/authReducer";

export const Header = () => {
    const user = useSelector<RootState, IUserAuthState | null>(state => state.auth.authData && state.auth.authData.user)
    const isAuth = useSelector<RootState, boolean>(state => state.auth.isAuth)
    const {data, isLoading, error} = useCheckAuthQuery()
    const dispatch = useAppDispatch()

    useEffect(() => {
        console.log('data', data)
        try {
            if (localStorage.getItem('token')) {
                const token = localStorage.getItem('token')
                dispatch(setToken({token}))
                if (!error && data) {
                    dispatch(setAuthData(data))
                }
            } else {
                dispatch(setAuthData(null))
            }
        } catch (e) {
            console.log(e)
        }
    }, [data, isAuth])

    console.log('user', user)
    console.log('isAuth', isAuth)

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <div className={styles.mainHeaderWrap}>
            <div className={styles.mainHeaderTitle}>Название сайта</div>
            <div className={styles.mainHeaderAuth}>
                {user ?
                    <div className={styles.mainHeaderIsAuth}>
                        <span>Добро пожаловать, {user.email}</span>
                        <span><a className={styles.loginLink} onClick={logoutHandler}>Выйти</a></span>
                    </div>
                    :
                    <div className={styles.mainHeaderIsLogout}>
                        <NavLink className={styles.loginLink} to={'/login'}>Войти</NavLink>
                        <NavLink className={styles.loginLink} to={'/registration'}>Регитсрация</NavLink>
                    </div>}
            </div>
        </div>
    )
}