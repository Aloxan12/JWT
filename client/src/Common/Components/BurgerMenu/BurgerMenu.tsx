import React from 'react';
import styles from './BurgerMenu.module.css'
import {NavLink} from "react-router-dom";

export interface IItemsRoute {
    path: string
    id: string
    title: string
    icon?: string
}

interface IBurgerMenu {
    active: boolean
    setActive:(value: boolean) => void
    header: string
    items: IItemsRoute[]
}

export const BurgerMenu = ({items, header, active, setActive }: IBurgerMenu) => {
    return (
        <div className={active ? `${styles.menu} ${styles.active}` : styles.menu}
            onClick={()=> setActive(false)}
        >
            <div className={styles.blur}/>
            <div className={styles.menuContent}
                 onClick={(e)=> e.stopPropagation()}
            >
                <div className={styles.menuHeader}>{header}</div>
                <ul>
                    {items.map((item: IItemsRoute) =>
                        <li>
                            <NavLink to={item.path} onClick={()=> setActive(false)}>{item.title}</NavLink>
                            <span>{item.icon}</span>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};