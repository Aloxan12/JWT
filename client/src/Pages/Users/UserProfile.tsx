import React from 'react';
import {useParams} from "react-router-dom";
import {useGetUserDetailQuery} from "../../redux/api/usersApi";
import styles from './Users.module.css'
import fakeAvatar from "../../utils/images/fake_avatar.png";
import {RoleTypes} from "../../router/AppRoute";

export const UserProfile = () => {
    const {id} = useParams()
    const {data: user} = useGetUserDetailQuery({id: id!}, {skip: !id})

    return (
        <div className={styles.UserProfileWrap}>
            <div className={styles.UserProfileInfoWrap}>
                <div className={styles.UserProfilePhoto}>
                    <img src={user && user.avatar ? `http://localhost:5555/` + user!.avatar : fakeAvatar} alt={'avatar'}/>
                </div>
                {!!user && <div className={styles.UserProfileInfo}>
                    <div>
                        Email: {user.email}
                    </div>
                    <div>
                        Роль: {user.role === RoleTypes.ADMIN ? 'Администратор' : "Пользователь"}
                    </div>
                </div>
                }
                <div>посты</div>
            </div>
        </div>
    );
};
