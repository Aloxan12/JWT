import React from 'react';
import {AppButton} from "../../Common/Components/AppButton/AppButton";

export const ComponentsShow = () => {
    return (
        <div>
            <AppButton onClick={(e)=> console.log(e.currentTarget)} />
        </div>
    );
};