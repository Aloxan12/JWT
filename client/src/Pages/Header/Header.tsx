import React, {useEffect} from "react";
import styles from './Header.module.css'
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../redux/store";
import {IUserAuthState, useCheckAuthQuery} from "../../redux/authApi";
import {setAuthData, setToken} from "../../redux/Reducers/authReducer/authReducer";

export const Header = () => {
    const user = useSelector<RootState, IUserAuthState | null>(state => state.auth.user)
    const { data, isLoading, error } = useCheckAuthQuery()
    const dispatch = useAppDispatch()

    useEffect(()=>{
        if(localStorage.getItem('token')){
            const token = localStorage.getItem('token')
            dispatch(setToken({token}))
            if(!error && data){
                dispatch(setAuthData(data))
            }
        }
    },[])

    console.log('user', user)
    return (
        <div className={styles.mainHeaderWrap}>
            <div className={styles.mainHeaderTitle}>Название сайта</div>
            <div className={styles.mainHeaderAuth}>
                {user ? <div>
                        <span>Добро пожаловать, {user.email}, <a>Выйти</a></span>
                    </div> :
                    <div><NavLink to={'/login'}>Войти</NavLink></div>}
                <div>
                    <NavLink to={'/registration'}>Регитсрация</NavLink>
                </div>
            </div>
        </div>
    )
}