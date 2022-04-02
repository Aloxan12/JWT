import React from 'react';
import {IPost} from "../../Type/PostType";
import styles from "./Posts.module.css";
import moment from "moment";
import {IUserApiData, IUserAuthState} from "../../redux/usersApi";
import {useDeletePostMutation} from "../../redux/postApi";
import {contentToHtml} from "../../utils/helpers";

interface IPostProps{
    post: IPost
    users?: IUserApiData[]
}

export const Post = ({post, users }: IPostProps) => {
    const [deletePost] = useDeletePostMutation()

    const deletePostHandler =()=>{
        console.log('id: post.id', post._id)
        deletePost({id: post._id})
    }
    return (
        <li className={styles.postsItem}>
            <div className={styles.postsItemTitle}>
                <span className={styles.postsItemAuthor}>{users && users.find(item => item._id === post.author)?.email}</span>
                <div>
                    <span>Опубликовано: {moment(post.publicDate).format('DD-MM-YYYY') || 'Дата не зафикирована'}</span>
                    <p onClick={deletePostHandler}>удалить</p>
                </div>
            </div>
            <div className={styles.postsItemContent}>
                {contentToHtml(post.postText)}
            </div>
        </li>
    )
}