import React from 'react';
import {useParams} from "react-router-dom";
import {useGetUserDetailQuery} from "../../redux/api/usersApi";
import styles from './Users.module.css'
import fakeAvatar from "../../utils/images/fake_avatar.png";

export const UserProfile = () => {
    const {id} = useParams()
    const {data: user} = useGetUserDetailQuery({id: id!}, {skip: !id})

    return (
        <div className={styles.UserProfileWrap}>
            <div className={styles.UserProfileInfo}>
                <div >
                    <img src={user!.avatar ? `http://localhost:5555/` + user!.avatar : fakeAvatar} alt={'avatar'}/>
                </div>
                <div>информация</div>
                <div>посты</div>
            </div>
        </div>
    );
};
