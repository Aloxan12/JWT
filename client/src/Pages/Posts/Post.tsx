import React from 'react';
import {IPost} from "../../Type/PostType";
import styles from "./Posts.module.css";
import moment from "moment";
import {IUserApiData, IUserAuthState} from "../../redux/usersApi";

interface IPostProps{
    post: IPost
    users?: IUserApiData[]
}

export const Post = ({post, users}: IPostProps) => {
    return (
        <li className={styles.postsItem}>
            <div className={styles.postsItemTitle}>
                <span className={styles.postsItemAuthor}>{users && users.find(item => item._id === post.author)?.email}</span>
                <span>Опубликовано: {moment(post.publicDate).format('DD-MM-YYYY') || 'Дата не зафикирована'}</span>
            </div>
            <div className={styles.postsItemContent}>
                {post.postText}
            </div>
        </li>
    )
}