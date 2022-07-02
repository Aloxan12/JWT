import React, {useState} from 'react';
import styles from './AppDropdown.module.css'
import {AppInput, IcoType} from "../AppInput/AppInput";

interface IAppDropdownBase{
    disabled?:boolean
    error?:string
    placeholder?:string
}

type AppDropdownType = IAppDropdownBase

export const AppDropdown = ({
                                disabled=false,
                                error,
                                placeholder
}: AppDropdownType) => {
    const [active, setActive] = useState<boolean>(false)
    console.log('active', active)
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
        </div>
    );
};