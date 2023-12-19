import React, { useCallback } from 'react';
import styles from './Posts.module.scss';
import moment from 'moment';
import { useDeletePostMutation, useLikePostMutation } from '../../app/core/api/postApi';
import { contentToHtml } from '../../utils/helpers';
import { AppTrash } from '../../Common/Components/AppTrash/AppTrash';
import { ToastWrapper, ToastWrapperType } from '../../Common/Components/ToastWrapper/ToastWrapper';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/core/redux/store';
import { RoleTypes } from '../../app/core/router/AppRouter';
import { IUser } from '../../app/core/api/dto/UserDto';
import { IPost } from '../../app/core/api/dto/PostDto';
import fakeAvatar from '../../utils/images/fake_avatar.png';
import likePhoto from '../../utils/images/like.png';

interface IPostProps {
  post: IPost;
  setCurrentPage: (value: number) => void;
}

export const Post = ({ post, setCurrentPage }: IPostProps) => {
  const [deletePost] = useDeletePostMutation();
  const [likePost] = useLikePostMutation();

  const user = useSelector<RootState, IUser | null>((state) => state.auth.user);

  const likePostHandler = useCallback(() => {
    likePost({ id: post.id });
  }, [post]);

  const deletePostHandler = () => {
    deletePost({ id: post.id }).then((res) => {
      const { data } = res as { data: { status: number; message: string; post: IPost } };
      if (data.status === 204) {
        setCurrentPage(1);
        ToastWrapper({
          msg: data.message.replace(/"/g, ''),
          type: ToastWrapperType.info,
        });
      }
    });
  };
  return (
    <li className={styles.postsItem}>
      <div className={styles.postsItemTitle}>
        <span className={styles.postsItemAuthor}>{post.author.email}</span>
        <div className={styles.postEditBlock}>
          <div
            className={`${styles.postLikeBlock} ${post.isLike ? styles.likeActive : ''}`}
            onClick={likePostHandler}
          >
            <img src={likePhoto} alt="like" />
            {post.likeCount}
          </div>
          {user && user.role === RoleTypes.ADMIN && (
            <div className={styles.postTrashBlock}>
              <AppTrash
                deleteHandler={deletePostHandler}
                size={'medium'}
                text="Вы действительно хотите удалить данный пост?"
              />
            </div>
          )}
        </div>
      </div>
      <div className={styles.postDateBlock}>
        <span>
          <span>Опубликовано:</span>{' '}
          {moment(post.publicDate).format('DD-MM-YYYY') || 'Дата не зафикирована'}
        </span>
      </div>
      <div className={styles.postsItemAvatar}>
        <img src={post.author?.avatar || fakeAvatar} alt="avatar" />
      </div>
      <div className={styles.postsItemContent}>{contentToHtml(post.postText)}</div>
    </li>
  );
};
