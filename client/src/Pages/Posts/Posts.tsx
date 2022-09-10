import React, { useEffect, useState } from 'react';
import styles from './Posts.module.css';
import {
  useCreatePostsMutation,
  useDeletePostMutation,
  useGetAllPostsQuery,
} from '../../redux/api/postApi';
import { Post } from './Post';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import moment from 'moment';
import { ToastWrapper, ToastWrapperType } from '../../Common/Components/ToastWrapper/ToastWrapper';
import { useGetAllUsersQuery } from '../../redux/api/usersApi';
import { AppButton } from '../../Common/Components/AppButton/AppButton';
import { IUser } from '../../redux/api/dto/UserDto';
import { IPost } from '../../redux/api/dto/PostDto';
import { throttle } from '../../Hooks/helpers/useDebounce';

export const Posts = () => {
  const user = useSelector<RootState, IUser | null>((state) => state.auth.authData.user);
  const [posts, setPosts] = useState<IPost[]>([]);
  const limit = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fetching, setFetching] = useState<boolean>(false);

  const { data: postsData, refetch } = useGetAllPostsQuery({ limit, page: currentPage });
  let count: number = 0;
  const { data: users } = useGetAllUsersQuery({ limit: 1000 });
  const [createPost] = useCreatePostsMutation();

  const [postText, setPostText] = useState('');
  const publicDate = moment(new Date()).toISOString();

  useEffect(() => {
    // Продумать пополение данных
    if (!!postsData && fetching && currentPage !== 1) {
      count = postsData.count;
      setPosts((prevState) => {
        return [...prevState, ...postsData.results];
      });
      refetch();
      setFetching(false);
    } else if (!!postsData) {
      refetch();
      setPosts(postsData.results);
    }
  }, [postsData]);

  useEffect(() => {
    if (fetching && postsData && postsData.count > limit * currentPage) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [fetching]);

  const scrollHandler = (e: any) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      50
    ) {
      setFetching(true);
    }
  };

  const throttleScrollHandler = throttle(scrollHandler, 300);

  useEffect(() => {
    document.addEventListener('scroll', throttleScrollHandler);
    return () => document.removeEventListener('scroll', throttleScrollHandler);
  }, []);

  const createPostHandler = async () => {
    if (user && postText !== '') {
      await createPost({ author: user.id, postText, publicDate });
      setPostText('');
      setCurrentPage(1);
      ToastWrapper({
        msg: 'Пост опубликован'.replace(/"/g, ''),
        type: ToastWrapperType.success,
      });
    } else {
      ToastWrapper({
        msg: 'Поле не может быть пустым'.replace(/"/g, ''),
        type: ToastWrapperType.error,
      });
    }
  };

  return (
    <div className={styles.postBlock}>
      <div className={styles.postHeader}>Посты</div>
      <div className={styles.postCreate}>
        <textarea value={postText} onChange={(e) => setPostText(e.currentTarget.value)}></textarea>
        <AppButton text="Опубликовать" onClick={createPostHandler} />
      </div>
      <ul className={styles.postsItems}>
        {posts.map((post: IPost, index) => {
          return (
            <Post
              post={post}
              users={!!users ? users?.results : []}
              key={`post-key - ${index}`}
              setCurrentPage={setCurrentPage}
            />
          );
        })}
      </ul>
    </div>
  );
};
