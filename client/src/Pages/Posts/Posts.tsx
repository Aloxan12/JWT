import React, {useState} from 'react';
import styles from "./Posts.module.css";
import {IPost} from "../../Type/PostType";
import {useCreatePostsMutation, useDeletePostMutation, useGetAllPostsQuery} from "../../redux/postApi";
import {Post} from "./Post";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {IUserAuthState} from "../../redux/authApi";
import moment from "moment";
import {ToastWrapper, ToastWrapperType} from "../../Common/Components/ToastWrapper/ToastWrapper";
import {useGetAllUsersQuery} from "../../redux/usersApi";
import {AppButton} from "../../Common/Components/AppButton/AppButton";

export const Posts = () => {
    const user = useSelector<RootState, IUserAuthState | null>(state => state.auth.authData.user)

    const {data: posts} = useGetAllPostsQuery()
    const {data: users} = useGetAllUsersQuery()
    const [createPost] = useCreatePostsMutation()

    const [postText, setPostText] = useState('')
    const publicDate = moment(new Date()).toISOString()

    const createPostHandler = async () => {
        if (user && postText !== '') {
            await createPost({author: user.id, postText, publicDate})
            setPostText('')
            ToastWrapper({
                msg: "Пост опубликован".replace(/"/g, ''),
                type: ToastWrapperType.success,
            })
        }else {
            ToastWrapper({
                msg: "Поле не может быть пустым".replace(/"/g, ''),
                type: ToastWrapperType.error,
            })
        }
    }

    return (
        <div className={styles.postBlock}>
            <div className={styles.postHeader}>Посты</div>
            <div className={styles.postCreate}>
                <textarea value={postText} onChange={(e) => setPostText(e.currentTarget.value)}></textarea>
                <AppButton text="Опубликовать" onClick={createPostHandler} />
            </div>
            <ul className={styles.postsItems}>
                {posts && posts.map((post: IPost, index) => {
                    return (
                        <Post post={post} users={users} key={`post-key - ${index}`}/>
                    )
                }).reverse()}
            </ul>
        </div>
    );
};