import React, {useState} from 'react';
import {Star} from "./Star";
import styles from './Star.module.css'

interface IAppRating {
    value: number
    onChange: (value: number) => void
}

type RatingHelperTextType = {
    [key in number]: string
}

const ratingHelperText: RatingHelperTextType = {
    1: 'плохо',
    2: 'не очень',
    3: 'норм',
    4: 'хорошо',
    5: 'класс',
}

export const AppRating = ({value, onChange}: IAppRating) => {
    const [helpText, setHelpText] = useState<number | null>(null)

    return (
        <div className={styles.AppRatingWrap}>
            {[...Array(5)]
                .map((item, index) =>
                    <Star
                        value={index + 1}
                        active={value > index}
                        onChange={onChange}
                        key={`AppRating ${item} ${index}`}
                        setHelpText={setHelpText}
                    />
                )}
             <p className={styles.helperText} style={{fontSize: '12px', textAlign: 'center'}}
            >{!!helpText && ratingHelperText[helpText]}
            </p>
        </div>
    );
};