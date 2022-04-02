import React from 'react';
import trashIco from '../../../utils/images/trash.png'
import styles from './AppTrash.module.css'

interface IAppTrashProps{
    size?: 'big' | 'medium' | 'small'
}

export const AppTrash = ({size}:IAppTrashProps) => {
    return (
        <React.Fragment>
            <img src={trashIco} alt="корзина" className={ styles.trash + " " + `${size ? styles[size] : styles.big}`}/>
        </React.Fragment>
    );
};
