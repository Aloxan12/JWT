import React, {useState} from 'react';
import styles from './App.module.css';
import {BurgerMenu, IItemsRoute} from "./Common/Components/BurgerMenu/BurgerMenu";


function App() {
    const [menuActive, setMenuActive] = useState(false)
    const itemsRoute: IItemsRoute[] = [{value: 'название ссылки', href:'путь', icon:'icon'}, {value: 'название ссылки', href:'путь', icon:'icon'}]
    return (
        <div className={styles.appWrap}>
            <div>
                <nav>
                    <div className={styles.burgerBtn} onClick={()=> setMenuActive(prevState => !prevState)}>
                        <span />
                    </div>
                </nav>
            </div>
            <BurgerMenu active={menuActive} setActive={setMenuActive} header="Меню" items={itemsRoute} />
        </div>
    );
}

export default App;
