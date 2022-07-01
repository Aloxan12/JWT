import React, {useState} from 'react';
import styles from './AppDropdown.module.css'
import {AppInput} from "../AppInput/AppInput";

interface IAppDropdownBase{
    disabled?:boolean
    error?:string
    placeholder?:string
}

type AppDropdownType = IAppDropdownBase

export const AppDropdown = ({
                                disabled,
                                error,
                                placeholder
}: AppDropdownType) => {
    const [active, setActive] = useState<boolean>(false)

    return (
        <div className={`${styles.AppDropdown} ${active ? styles.Active : ''}`}>
            <AppInput
                onChange={()=>(disabled ? false : setActive((prev) => !prev))}
                error={error}
                placeholder={placeholder}
            />
        </div>
    );
};