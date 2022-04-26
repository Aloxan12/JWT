import React from 'react';
import {Star} from "./Star";

interface IAppRating {
    value: number | null
    onChange?: (value: number) => void
}

export const AppRating = ({value, onChange}: IAppRating) => {
    return (
        <div>
            {[...Array(5)].map((item, index)=> <Star active={true}/>)}
        </div>
    );
};