import React, {useEffect, useState} from "react";
import styles from './Header.module.css'
import {NavLink, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../redux/store";
import {IUserAuthState, useLogoutMutation} from "../../redux/authApi";
import {logout, setAuthData, setIsAuth} from "../../redux/Reducers/authReducer/authReducer";
import {BurgerMenu, IItemsRoute} from "../../Common/Components/BurgerMenu/BurgerMenu";
import {checkAuthApi} from "../../redux/checkAuthApi";

interface IHeader {
    itemsRoute: IItemsRoute[]
}

export const Header = ({itemsRoute}: IHeader) => {
    const user = useSelector<RootState, IUserAuthState | null>(state => state.auth.authData.user)
    const isAuth = useSelector<RootState, boolean>(state => state.auth.isAuth)
    const [logoutApi] = useLogoutMutation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const [menuActive, setMenuActive] = useState(false)

    useEffect(() => {
        if (!isAuth) {
            navigate('/login')
        }
    }, [isAuth])

    useEffect(() => {
        try {
            if (localStorage.getItem('token')) {
                checkAuthApi().then(data => {
                    if (data) {
                        localStorage.setItem('token', data.accessToken)
                        dispatch(setIsAuth(true))
                        dispatch(setAuthData(data))
                    }
                })
            } else {
                dispatch(setAuthData({user: null, accessToken: null, refreshToken: null}))
            }
        } catch (e) {
            console.log(e)
        }
    }, [isAuth])

    const logoutHandler = async () => {
        await logoutApi()
        dispatch(logout())
        navigate('/login')
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
            {isAuth &&
                <nav>
                    <div className={styles.burgerBtn} onClick={() => setMenuActive(prevState => !prevState)}>
                        <span/>
                    </div>
                </nav>
            }
            <BurgerMenu active={menuActive} setActive={setMenuActive} header="Меню" items={itemsRoute}/>
        </div>
    )
}