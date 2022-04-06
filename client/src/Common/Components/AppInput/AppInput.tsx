import React from 'react';

interface IAppInput{
    label: string
    type?: string
}

export const AppInput = ({label, type = 'text'}: IAppInput) => {
    return (
        <div>
            {label && <label>{label}</label>}
            <div>
                <input type={type}/>
            </div>
        </div>
    );
}