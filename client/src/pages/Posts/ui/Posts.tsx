import React, { useState } from 'react';
import styles from './Posts.module.scss';
import { AppTitle } from '../../../shared/ui/AppTitle/AppTitle';
import { AppCard } from '../../../shared/ui/AppCard/AppCard';
import { CreatePost } from './containers/CreatePost/CreatePost';
import { PostList } from './containers/PostList/PostList';
import { useInfiniteScroll } from '../../../shared/lib/hooks/useInfiniteScroll';
import { IPost } from '../../../app/core/api/dto/PostDto';
import { useGetAllPostsQuery } from '../../../app/core/api/postApi';

const Posts = () => {
  const [page, setPage] = useState<number>(1);
  const { dataList, measureRef, isLoading, setCurrentData } = useInfiniteScroll<IPost, {}>({
    getter: useGetAllPostsQuery,
    page,
    setPage,
  });

  return (
    <AppCard classNameContent={styles.postBlock} max boxShadow withoutBorder>
      <AppTitle title="Посты" titleTag="h1" align="center" />
      <CreatePost setCurrentData={setCurrentData} />
      <PostList
        dataList={dataList}
        setCurrentData={setCurrentData}
        measureRef={measureRef}
        isLoading={isLoading}
      />
    </AppCard>
  );
};

export default Posts;
