import React from 'react';
import {IPost} from "../../Type/PostType";
import styles from "./Posts.module.css";
import moment from "moment";
import {IUserApiData, IUserDataDto} from "../../redux/usersApi";
import {useDeletePostMutation} from "../../redux/postApi";
import {contentToHtml} from "../../utils/helpers";
import {AppTrash} from "../../Common/Components/AppTrash/AppTrash";
import {ToastWrapper, ToastWrapperType} from "../../Common/Components/ToastWrapper/ToastWrapper";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {RoleTypes} from "../../router/AppRoute";

interface IPostProps{
    post: IPost
    users?: IUserDataDto[]
}

export const Post = ({post, users }: IPostProps) => {
    const [deletePost] = useDeletePostMutation()

    const user = useSelector<RootState, IUserDataDto | null>(state => state.auth.authData.user)

    const deletePostHandler =()=>{
        deletePost({id: post._id}).then(res =>{
            const { data } = res as {data: {status: number, message: string, post: IPost}}
            if(data.status === 204){
                ToastWrapper({
                    msg: data.message.replace(/"/g, ''),
                    type: ToastWrapperType.info,
                })
            }
        })
    }
    return (
        <li className={styles.postsItem}>
            <div className={styles.postsItemTitle}>
                <span className={styles.postsItemAuthor}>{users && users.find(item => item.id === post.author)?.email}</span>
                <div className={styles.postEditBlock}>
                    <span>Опубликовано: {moment(post.publicDate).format('DD-MM-YYYY') || 'Дата не зафикирована'}</span>
                    {user && user.role === RoleTypes.ADMIN && <div className={styles.postTrashBlock}>
                        <AppTrash
                        deleteHandler={deletePostHandler}
                        size={'medium'}
                        text="Вы действительно хотите удалить данный пост?" />
                        </div>}
                </div>
            </div>
            <div className={styles.postsItemContent}>
                {contentToHtml(post.postText)}
            </div>
        </li>
    )
}