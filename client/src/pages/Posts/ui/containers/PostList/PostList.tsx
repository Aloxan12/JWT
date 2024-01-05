import React, { useEffect, useState } from 'react';
import styles from '../../Posts.module.scss';
import { IPost } from '../../../../../app/core/api/dto/PostDto';
import { Post } from '../Post/Post';
import { useGetAllPostsQuery } from '../../../../../app/core/api/postApi';
import { throttle } from '../../../../../shared/lib/hooks/useDebounce';
import { AppLoader } from '../../../../../Common/Components/AppLoader/AppLoader';

interface PostListProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const PostList = ({ currentPage, setCurrentPage }: PostListProps) => {
  const [fetching, setFetching] = useState<boolean>(false);
  const [posts, setPosts] = useState<IPost[]>([]);
  const limit = 10;
  const {
    data: postsData,
    isLoading: isLoadingList,
    isFetching: isFetchingList,
  } = useGetAllPostsQuery({ limit, page: currentPage });

  useEffect(() => {
    if (!!postsData && fetching && currentPage !== 1) {
      setPosts((prevState) => [...prevState, ...postsData.results]);
    } else if (!!postsData) {
      setPosts(postsData.results);
    }
    setFetching(false);
  }, [postsData]);

  useEffect(() => {
    if (fetching && postsData && postsData.count > limit * currentPage) {
      setCurrentPage((prev) => prev + 1);
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

  console.log('postsData', posts);

  return (
    <>
      {(isFetchingList || isLoadingList) && <AppLoader />}
      <ul className={styles.postsItems}>
        {posts.map((post: IPost) => {
          return <Post post={post} key={post.id} setCurrentPage={setCurrentPage} />;
        })}
      </ul>
    </>
  );
};
