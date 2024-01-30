import React, { useCallback } from 'react';
import cls from '../../Posts.module.scss';
import { IPost } from '../../../../../app/core/api/dto/PostDto';
import { Post } from '../Post/Post';
import { useGetAllPostsQuery, useLikePostMutation } from '../../../../../app/core/api/postApi';
import { useAppSelector } from '../../../../../app/core/redux/store';
import { userIsAdmin } from '../../../../../app/core/redux/Reducers/auth/selectors';
import { Flex } from '../../../../../shared/ui/Flex/Flex';
import { AppSkeleton } from '../../../../../shared/ui/AppSkeleton/AppSkeleton';
import { useInfiniteScroll } from '../../../../../shared/lib/hooks/useInfiniteScroll';

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

  const [likePost] = useLikePostMutation();
  const likePostHandler = useCallback(
    (id: string) => () =>
      likePost({ id }).then((res) => {
        const newPost = (res as unknown as { data: { post: IPost } })?.data?.post;
        console.log('newPost', newPost);
        if (newPost) {
          setCurrentData((prevState) =>
            prevState.map((post) => (newPost.id === post.id ? newPost : post))
          );
        }
      }),
    []
  );

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
              setCurrentPage={setPage}
              measureRef={isLastEl ? measureRef : undefined}
              likePostHandler={likePostHandler}
            />
          );
        })}
      </ul>
      {isLoading && <AppPostListLoader />}
    </>
  );
};
