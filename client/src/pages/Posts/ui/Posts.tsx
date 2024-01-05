import React, { useState } from 'react';
import styles from './Posts.module.scss';
import { AppTitle } from '../../../shared/ui/AppTitle/AppTitle';
import { AppCard } from '../../../shared/ui/AppCard/AppCard';
import { CreatePost } from './containers/CreatePost/CreatePost';
import { PostList } from './containers/PostList/PostList';

const Posts = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <AppCard classNameContent={styles.postBlock} max boxShadow withoutBorder>
      <AppTitle title="Посты" titleTag="h1" align="center" />
      <CreatePost setCurrentPage={setCurrentPage} />
      <PostList currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </AppCard>
  );
};

export default Posts;
