import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './App.module.css';


function App() {

    return (
        <div className={styles.appWrap}>
            <div>
                <nav>
                    <div className={styles.burgerBtn}>
                        <span />
                    </div>
                </nav>
            </div>
            <NavLink to={"/registration"}>Регистрация</NavLink>
        </div>
    );
}

export default App;
