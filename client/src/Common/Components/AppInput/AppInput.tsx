import React, {ChangeEvent} from 'react';
import styles from './AppInput.module.css'
import icoRightPhoto from '../../../utils/images/arrow-down.png'

export enum IcoType{
    ico_right = 'ico-right'
}

interface IAppInputBase{
    label?: string
    placeholder?: string
    type?: string
    value?: string | null
    onChange: (value: string) => void
    error?: string | null
}

interface IAppInputTextarea extends IAppInputBase{
    icoRight?:never
    rows: number
    onClick?: never
    dropdownInput?: never
    dropdownActive?: never
}

interface IAppInputIcoRight extends IAppInputBase{
    icoRight?:IcoType
    rows?: never
    onClick?: never
    dropdownInput?: never
    dropdownActive?: never
}

interface IAppInputDropdown extends IAppInputBase{
    icoRight?:never
    rows?: never
    onClick: () => void
    dropdownInput: boolean
    dropdownActive: boolean
}

type AppInputType = IAppInputTextarea | IAppInputIcoRight | IAppInputDropdown

export const AppInput = ({
                             label,
                             type = 'text',
                             value,
                             onChange,
                             onClick,
                             dropdownInput,
                             dropdownActive,
                             error,
                             placeholder,
                             icoRight}: AppInputType) => {
    const wrapperProps = onClick ? { onClick } : {}

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>{
        const result = e.currentTarget.value
        return  onChange(result)
    }

    return (
        <div className={styles.appInputWrap} {...wrapperProps}>
            {label && <label>{label}</label>}
            <div className={`${styles.appInput} ${error ? styles.borderError : ''} ${dropdownActive ? styles.Active : ''}`}>
                {!!icoRight && icoRight === IcoType.ico_right || !!dropdownInput &&
                    <img src={icoRightPhoto} alt="arrow-down"  className={`${styles.IcoRight} ${dropdownActive ? styles.Active : ''}`}/>
                }
                <input value={!!value ? value : ''} placeholder={placeholder} type={type} onChange={onChangeHandler}/>
            </div>
            {error && <div className={styles.appInputError}>{error}</div>}
        </div>
    );
}