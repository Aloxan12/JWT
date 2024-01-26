import React, { useEffect, useState } from 'react';
import cls from '../../Posts.module.scss';
import { IPost } from '../../../../../app/core/api/dto/PostDto';
import { Post } from '../Post/Post';
import { useGetAllPostsQuery } from '../../../../../app/core/api/postApi';
import { throttle } from '../../../../../shared/lib/hooks/useDebounce';
import { AppLoader } from '../../../../../Common/Components/AppLoader/AppLoader';
import { useAppSelector } from '../../../../../app/core/redux/store';
import { userIsAdmin } from '../../../../../app/core/redux/Reducers/auth/selectors';

interface PostListProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const PostList = ({ currentPage, setCurrentPage }: PostListProps) => {
  const [fetching, setFetching] = useState<boolean>(false);
  const isAdmin = useAppSelector(userIsAdmin);
  const limit = 10;
  const {
    data: postsData,
    isLoading: isLoadingList,
    isFetching: isFetchingList,
  } = useGetAllPostsQuery({ limit, page: currentPage });

  useEffect(() => {
    if (fetching && postsData && postsData.count > limit * currentPage) {
      setCurrentPage((prev) => prev + 1);
      setFetching(false);
    }
  }, [fetching]);

  const scrollHandler = (e: any) => {
    const { scrollTop, scrollHeight } = e.target.documentElement;
    if (scrollHeight - (scrollTop + window.innerHeight) < 50) {
      setFetching(true);
    }
  };

  const throttleScrollHandler = throttle(scrollHandler, 300);

  useEffect(() => {
    document.addEventListener('scroll', throttleScrollHandler);
    return () => document.removeEventListener('scroll', throttleScrollHandler);
  }, []);

  return (
    <>
      {(isFetchingList || isLoadingList) && <AppLoader />}
      <ul className={cls.postsItems}>
        {postsData?.results.map((post: IPost) => {
          return (
            <Post isAdmin={isAdmin} post={post} key={post.id} setCurrentPage={setCurrentPage} />
          );
        })}
      </ul>
    </>
  );
};
