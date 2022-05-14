import React from 'react';
import styles from './PersonalAccount.module.css'
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

export const PersonalAccount = () => {
    const {id} = useParams()
    const user = useSelector((state:RootState) => state.auth.authData.user)
    return (
        <div className={styles.PersonalAccountWrap}>
            <div><img src={user!.avatar ? `http://localhost:5555/` + user!.avatar : 'фейк'}/></div>
            <div>Info</div>
        </div>
    );
};
