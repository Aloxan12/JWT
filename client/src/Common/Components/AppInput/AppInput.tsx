import React, {ChangeEvent} from 'react';
import styles from './AppInput.module.css'

interface IAppInput{
    label?: string
    type?: string
    value: string
    onChange: (value: string) => void
    error?: string | null
}

export const AppInput = ({label, type = 'text', value, onChange, error}: IAppInput) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>{
        const result = e.currentTarget.value
        return  onChange(result)
    }

    return (
        <div className={styles.appInputWrap}>
            {label && <label>{label}</label>}
            <div className={`${styles.appInput} ${error && styles.borderError}`}>
                <input value={value} type={type} onChange={onChangeHandler}/>
            </div>
            {error && <div className={styles.appInputError}>{error}</div>}
        </div>
    );
}