import React, { useCallback, useRef } from 'react';
import cls from '../../Posts.module.scss';
import { IPost } from '../../../../../app/core/api/dto/PostDto';
import { Post } from '../Post/Post';
import { useGetAllPostsQuery } from '../../../../../app/core/api/postApi';
import { useAppSelector } from '../../../../../app/core/redux/store';
import { userIsAdmin } from '../../../../../app/core/redux/Reducers/auth/selectors';
import { Flex } from '../../../../../shared/ui/Flex/Flex';
import { AppSkeleton } from '../../../../../shared/ui/AppSkeleton/AppSkeleton';
import { useIntersectionObserver } from '../../../../../shared/lib/hooks/useIntersectionObserver';

const AppPostListLoader = () => {
  return (
    <Flex align="start" direction="column" gap="32" max>
      <AppSkeleton width="100%" height="130px" border="12px" />
      <AppSkeleton width="100%" height="130px" border="12px" />
      <AppSkeleton width="100%" height="130px" border="12px" />
      <AppSkeleton width="100%" height="130px" border="12px" />
    </Flex>
  );
};

interface PostListProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const PostList = ({ currentPage, setCurrentPage }: PostListProps) => {
  const isAdmin = useAppSelector(userIsAdmin);
  const limit = 10;
  const {
    data: postsData,
    isLoading: isLoadingList,
    isFetching: isFetchingList,
  } = useGetAllPostsQuery({ limit, page: currentPage });

  const observerTarget = useRef<HTMLDivElement | null>(null);
  const onNextPage = useCallback(() => setCurrentPage((prevState) => prevState + 1), []);
  useIntersectionObserver(observerTarget, onNextPage, !isLoadingList);

  return (
    <>
      <ul className={cls.postsItems}>
        {postsData?.results.map((post: IPost) => {
          return (
            <Post isAdmin={isAdmin} post={post} key={post.id} setCurrentPage={setCurrentPage} />
          );
        })}
      </ul>
      <div ref={observerTarget} />
      {(isLoadingList || isFetchingList) && <AppPostListLoader />}
    </>
  );
};
