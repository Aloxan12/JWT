import React from "react";
import styles from './Header.module.css'
import {NavLink} from "react-router-dom";

export const Header =()=>{
    return(
        <div className={styles.mainHeaderWrap}>
            <div className={styles.mainHeaderTitle}>Название сайта</div>
            <div className={styles.mainHeaderAuth}>
                <NavLink to={'/login'}>Войти</NavLink>
                <NavLink to={'/registration'}>Регитсрация</NavLink>
            </div>
        </div>
    )
}