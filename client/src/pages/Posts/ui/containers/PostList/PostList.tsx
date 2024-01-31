import React from 'react';
import cls from '../../Posts.module.scss';
import { IPost } from '../../../../../app/core/api/dto/PostDto';
import { Post } from '../Post/Post';
import { useGetAllPostsQuery } from '../../../../../app/core/api/postApi';
import { useAppSelector } from '../../../../../app/core/redux/store';
import { userIsAdmin } from '../../../../../app/core/redux/Reducers/auth/selectors';
import { Flex } from '../../../../../shared/ui/Flex/Flex';
import { AppSkeleton } from '../../../../../shared/ui/AppSkeleton/AppSkeleton';
import { useInfiniteScroll } from '../../../../../shared/lib/hooks/useInfiniteScroll';
import { useLikePost } from '../../hooks/useLikePost';
import { useDeletePost } from '../../hooks/useDeletePost';

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

export const PostList = ({ currentPage: page, setCurrentPage: setPage }: PostListProps) => {
  const isAdmin = useAppSelector(userIsAdmin);
  const { dataList, measureRef, isLoading, setCurrentData } = useInfiniteScroll<IPost, {}>({
    getter: useGetAllPostsQuery,
    page,
    setPage,
  });
  const likePostHandler = useLikePost(setCurrentData);
  const deletePostHandler = useDeletePost(setCurrentData);

  return (
    <>
      <ul className={cls.postsItems}>
        {dataList.map((post, index, arr) => {
          const isLastEl = index === arr.length - 1;
          return (
            <Post
              isAdmin={isAdmin}
              post={post}
              key={post.id}
              measureRef={isLastEl ? measureRef : undefined}
              likePostHandler={likePostHandler}
              deletePostHandler={deletePostHandler}
            />
          );
        })}
      </ul>
      {isLoading && <AppPostListLoader />}
    </>
  );
};
