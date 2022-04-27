import React from 'react';
import {Star} from "./Star";

interface IAppRating {
    value: number
    onChange: (value: number) => void
}

export const AppRating = ({value, onChange}: IAppRating) => {
    return (
        <div>
            {[...Array(5)]
                .map((item, index)=>
                    <Star
                        value={index + 1}
                        active={value > index}
                        onChange={onChange}
                    />
                )}
        </div>
    );
};