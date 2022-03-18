import React from 'react';
import {IPost} from "../../Type/PostType";
import styles from "./Posts.module.css";

interface IPostProps{
    post: IPost
}

export const Post = ({post}: IPostProps) => {
    return (
        <li className={styles.postsItem}>
            <div className={styles.postsItemTitle}>
                <span className={styles.postsItemAuthor}>от кого . </span>
                <span>Опубликовано: {new Date(post.publicDate).toLocaleString()}</span>
            </div>
            <div className={styles.postsItemContent}>
                {post.message}
            </div>
        </li>
    )
}