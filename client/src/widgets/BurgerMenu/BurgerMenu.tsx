import React from 'react';
import styles from './BurgerMenu.module.css';
import { NavLink } from 'react-router-dom';
import { IRouteObj } from '../../app/core/router/AppRouter';

interface IBurgerMenu {
  active: boolean;
  setActive: (value: boolean) => void;
  header: string;
  items: IRouteObj[];
}

export const BurgerMenu = ({ items, header, active, setActive }: IBurgerMenu) => {
  return (
    <div
      className={active ? `${styles.menu} ${styles.active}` : styles.menu}
      onClick={() => setActive(false)}
    >
      <div className={styles.blur} />
      <div className={styles.menuContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.menuHeader}>{header}</div>
        <ul>
          {items.map((item, i: number) => (
            <li key={`BurgerMenuKey - ${i}`}>
              <NavLink
                to={item.path}
                onClick={() => {
                  setActive(false);
                }}
              >
                {item.path}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
