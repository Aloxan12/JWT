import React from 'react';
import {Star} from "./Star";
import styles from './Star.module.css'

interface IAppRating {
    value: number
    onChange: (value: number) => void
}

export const AppRating = ({value, onChange}: IAppRating) => {
    console.log('value', value)
    return (
        <div>
            {[...Array(5)]
                .map((item, index) =>
                    <Star
                        value={index + 1}
                        active={value > index}
                        onChange={onChange}
                        key={`AppRating ${item} ${index}`}
                    />
                )}
            <p className={styles.helperText} style={{fontSize: '12px', textAlign: 'center'}}>текст</p>
        </div>
    );
};