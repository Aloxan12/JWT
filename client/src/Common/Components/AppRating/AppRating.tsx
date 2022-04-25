import React from 'react';
import {Star} from "./Star";

interface IAppRating {
    value: number | null
    onChange: (value: number) => void
}

export const AppRating = ({value, onChange}: IAppRating) => {
    return (
        <div>
            <Star active={true}/>
            <Star active={true}/>
            <Star active={true}/>
            <Star active={false}/>
            <Star active={false}/>
        </div>
    );
};