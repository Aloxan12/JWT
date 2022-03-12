import React from 'react';
import styles from './BurgerMenu.module.css'

export interface IItemsRoute {
    href: string,
    value: string,
    icon: string
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
                    {items.map((item: any) =>
                        <li>
                            <a href={item.href}>{item.value}</a>
                            <span>{item.icon}</span>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};