import React from 'react';
import styles from './PersonalAccount.module.css'
import {useParams} from "react-router-dom";

export const PersonalAccount = () => {
    const {id} = useParams()
    console.log('id', id)
    return (
        <div>
            PersonalAccount
        </div>
    );
};
