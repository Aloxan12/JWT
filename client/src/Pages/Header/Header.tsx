import React, {useEffect, useState} from "react";
import styles from './Header.module.css'
import {NavLink, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../redux/store";
import {IUserAuthState, useCheckAuthQuery, useLogoutMutation} from "../../redux/authApi";
import {logout, setAuthData} from "../../redux/Reducers/authReducer/authReducer";
import {BurgerMenu, IItemsRoute} from "../../Common/Components/BurgerMenu/BurgerMenu";

interface IHeader {
    itemsRoute: IItemsRoute[]
}

export const Header = ({itemsRoute}: IHeader) => {
    const user = useSelector<RootState, IUserAuthState | null>(state => state.auth.authData.user)
    const isAuth = useSelector<RootState, boolean>(state => state.auth.isAuth)
    const {data, isLoading, error} = useCheckAuthQuery()
    const [logoutApi] = useLogoutMutation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const [menuActive, setMenuActive] = useState(false)
    // const itemsRoute: IItemsRoute[] = [{value: 'название ссылки', href:'путь', icon:'icon'}, {value: 'название ссылки', href:'путь', icon:'icon'}]

    useEffect(() => {
        try {
            if (localStorage.getItem('token') || isAuth) {
                if (!error && data) {
                    dispatch(setAuthData(data))
                }
            } else {
                dispatch(setAuthData({user: null, accessToken: null, refreshToken: null}))
            }
        } catch (e) {
            console.log(e)
        }
    }, [data, isAuth, user])

    const logoutHandler = async () => {
        await logoutApi()
        dispatch(logout())
        navigate('/login')
    }

    console.log('token', localStorage.getItem('token'))

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
            <nav>
                <div className={styles.burgerBtn} onClick={() => setMenuActive(prevState => !prevState)}>
                    <span/>
                </div>
            </nav>
            <BurgerMenu active={menuActive} setActive={setMenuActive} header="Меню" items={itemsRoute}/>
        </div>
    )
}