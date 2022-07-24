import React, {useState} from 'react';
import trashIco from '../../../utils/images/trash.png'
import styles from './AppTrash.module.css'
import {Modal} from "../Modal/Modal";
import {AppButton} from "../AppButton/AppButton";

interface IAppTrashProps {
    size?: 'big' | 'medium' | 'small'
    deleteHandler: ()=> void
    text?: string
}

export const AppTrash = ({size, deleteHandler, text}: IAppTrashProps) => {
    const [active, setActive] = useState<boolean>(false)

    return (
        <React.Fragment>
            <img
                src={trashIco}
                alt="корзина"
                className={styles.trash + " " + `${size ? styles[size] : styles.big}`}
                onClick={() => setActive(true)}
            />

            <Modal active={active} setActive={setActive} title="Предупреждение">
                <div className={styles.trashModelContent}>
                    <div>{text || 'Удалить?'}</div>
                    <div>
                        <AppButton onClick={()=>setActive(false)} text={'нет'}/>
                        <AppButton onClick={()=> {
                            setActive(false)
                            deleteHandler()
                        }} text={'да'}/>
                    </div>
                </div>
            </Modal>
        </React.Fragment>
    );
};
