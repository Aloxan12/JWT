import React, {ChangeEvent} from 'react';
import styles from './AppInput.module.css'

interface IAppInput{
    label?: string
    type?: string
    value: string
    onChange: (value: ChangeEvent<HTMLInputElement>) => void
    error?: string | null
}

export const AppInput = ({label, type = 'text', value, onChange, error}: IAppInput) => {
    return (
        <div className={styles.appInputWrap}>
            {label && <label>{label}</label>}
            <div>
                <input value={value} type={type} onChange={onChange}/>
            </div>
            {error && <div>{error}</div>}
        </div>
    );
}