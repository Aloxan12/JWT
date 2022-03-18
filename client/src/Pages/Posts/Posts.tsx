import React from 'react';
import styles from "./Posts.module.css";
import {IPost} from "../../Type/PostType";
import {useGetAllPostsQuery} from "../../redux/postApi";
import {Post} from "./Post";

export const Posts = () => {
    const {data: posts} = useGetAllPostsQuery()

    return (
        <div className={styles.postBlock}>
            <div className={styles.postHeader}>Посты</div>
            <div className={styles.postCreate}>
                <textarea></textarea>
                <button>Опубликовать</button>
            </div>
            <ul className={styles.postsItems}>
                {posts && posts.map((post: IPost, index) => {
                    return (
                        <Post post={post} key={`post-key - ${index}`}/>
                    )
                })}
            </ul>
        </div>
    );
};