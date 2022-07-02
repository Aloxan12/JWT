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
}

interface IAppInputIcoRight extends IAppInputBase{
    icoRight?:IcoType
    rows?: never
}

type AppInputType = IAppInputTextarea | IAppInputIcoRight

export const AppInput = ({label, type = 'text', value, onChange, error, placeholder, icoRight}: AppInputType) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>{
        const result = e.currentTarget.value
        return  onChange(result)
    }

    return (
        <div className={styles.appInputWrap}>
            {label && <label>{label}</label>}
            <div className={`${styles.appInput} ${error && styles.borderError}`}>
                {!!icoRight && icoRight === IcoType.ico_right &&
                    <img src={icoRightPhoto} alt="arrow-down"  className={styles.IcoRight}/>
                }
                <input value={!!value ? value : ''} placeholder={placeholder} type={type} onChange={onChangeHandler}/>
            </div>
            {error && <div className={styles.appInputError}>{error}</div>}
        </div>
    );
}