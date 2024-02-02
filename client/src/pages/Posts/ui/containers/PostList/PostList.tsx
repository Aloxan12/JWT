import React from 'react';
import cls from '../../Posts.module.scss';
import { IPost } from '../../../../../app/core/api/dto/PostDto';
import { Post } from '../Post/Post';
import { useAppSelector } from '../../../../../app/core/redux/store';
import { userIsAdmin } from '../../../../../app/core/redux/Reducers/auth/selectors';
import { Flex } from '../../../../../shared/ui/Flex/Flex';
import { AppSkeleton } from '../../../../../shared/ui/AppSkeleton/AppSkeleton';
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
  dataList: IPost[];
  measureRef: (node: HTMLElement | null) => void;
  isLoading: boolean;
  setCurrentData: React.Dispatch<React.SetStateAction<IPost[]>>;
}

export const PostList = ({ dataList, measureRef, isLoading, setCurrentData }: PostListProps) => {
  const isAdmin = useAppSelector(userIsAdmin);
  const [likePost, isLikeLoadingId] = useLikePost(setCurrentData);
  const [deletePost, isDeleteLoadingId] = useDeletePost(setCurrentData);

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
              likeLoading={post.id === isLikeLoadingId}
              likePost={likePost}
              deleteLoading={post.id === isDeleteLoadingId}
              deletePost={deletePost}
            />
          );
        })}
      </ul>
      {isLoading && <AppPostListLoader />}
    </>
  );
};
