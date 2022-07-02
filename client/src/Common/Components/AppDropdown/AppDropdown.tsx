import React, {useState} from 'react';
import styles from './AppDropdown.module.css'
import {AppInput, IcoType} from "../AppInput/AppInput";

interface IAppDropdownBase<T, TKey extends keyof T>{
    disabled?:boolean
    error?:string
    placeholder?:string
    data: T[]
    value: TKey
    resetValueHandler?: ()=> void
}

type AppDropdownType<T, TKey extends keyof T> = IAppDropdownBase<T, TKey>

export const AppDropdown = <T, TKey extends keyof T>({
                                disabled=false,
                                resetValueHandler,
                                error,
                                placeholder
}: AppDropdownType<T, TKey>) => {
    const [active, setActive] = useState<boolean>(false)
    const [currentData, setCurrentData] = useState<T[]| []>([])

    return (
        <div className={`${styles.AppDropdown} ${active ? styles.Active : ''}`}>
            <AppInput
                onClick={()=>(disabled ? false : setActive((prev) => !prev))}
                onChange={(value)=>{}}
                dropdownInput
                error={error}
                placeholder={placeholder}
                dropdownActive={active}
            />
            {active && !!currentData && (
                <div className={styles.DropdownValuesBlock}>
                    {!resetValueHandler && (
                        <div
                            className={`${styles.ValueItem} ${styles.ResetFilter}`}
                            // onClick={() => onChangeHandler(null)}
                        >
                            Очистить фильтр
                        </div>
                    )}
                    <div className={`${styles.ValueItem}`}>1</div>
                    <div className={`${styles.ValueItem}`}>2</div>
                    <div className={`${styles.ValueItem}`}>3</div>
                    <div className={`${styles.ValueItem}`}>4</div>
                    <div className={`${styles.ValueItem}`}>444444444444444444444444444444444</div>
                    <div className={`${styles.ValueItem}`}>4</div>
                    <div className={`${styles.ValueItem}`}>4</div>
                    <div className={`${styles.ValueItem}`}>4</div>
                    <div className={`${styles.ValueItem}`}>4</div>
                    <div className={`${styles.ValueItem}`}>4</div>
                    <div className={`${styles.ValueItem}`}>4</div>
                </div>
            )}
        </div>
    );
};