import React, { useEffect, useRef } from 'react';
import cls from '../../Posts.module.scss';
import { IPost } from '../../../../../app/core/api/dto/PostDto';
import { Post } from '../Post/Post';
import { useGetAllPostsQuery } from '../../../../../app/core/api/postApi';
import { AppLoader } from '../../../../../Common/Components/AppLoader/AppLoader';
import { useAppSelector } from '../../../../../app/core/redux/store';
import { userIsAdmin } from '../../../../../app/core/redux/Reducers/auth/selectors';

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

  const observerTarget = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCurrentPage((prevState) => prevState + 1);
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current && !isLoadingList) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current && !isLoadingList) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, isLoadingList]);

  return (
    <>
      {(isFetchingList || isLoadingList) && <AppLoader />}
      <ul className={cls.postsItems}>
        {postsData?.results.map((post: IPost) => {
          return (
            <Post isAdmin={isAdmin} post={post} key={post.id} setCurrentPage={setCurrentPage} />
          );
        })}
        <li ref={observerTarget} />
      </ul>
    </>
  );
};
