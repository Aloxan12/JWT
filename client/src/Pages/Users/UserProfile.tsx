import React from 'react';
import {useParams} from "react-router-dom";
import {useGetUserDetailQuery} from "../../redux/api/usersApi";
import styles from './Users.module.css'

export const UserProfile = () => {
    const {id} = useParams()
    const {data: user} = useGetUserDetailQuery({id: id!}, {skip: !id})

    return (
        <div className={styles.UserProfileWrap}>
            <div className={styles.UserProfileInfo}></div>
        </div>
    );
};
