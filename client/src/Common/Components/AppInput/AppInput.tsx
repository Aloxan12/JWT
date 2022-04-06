import React, {ChangeEvent} from 'react';

interface IAppInput{
    label: string
    type?: string
    value?: string
    onChange: (value: ChangeEvent<HTMLInputElement>) => void
}

export const AppInput = ({label, type = 'text', value, onChange}: IAppInput) => {
    return (
        <div>
            {label && <label>{label}</label>}
            <div>
                <input value={value} type={type} onChange={onChange}/>
            </div>
        </div>
    );
}