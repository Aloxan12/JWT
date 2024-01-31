import { useLikePostMutation } from '../../../../app/core/api/postApi';
import React, { useCallback } from 'react';
import { IPost } from '../../../../app/core/api/dto/PostDto';

export const useLikePost = (setCurrentData: React.Dispatch<React.SetStateAction<IPost[]>>) => {
  const [likePost] = useLikePostMutation();

  return useCallback(
    (id: string) => () =>
      likePost({ id }).then((res) => {
        const newPost = (res as unknown as { data: { post: IPost } })?.data?.post;
        if (newPost) {
          setCurrentData((prevState) =>
            prevState.map((post) => (newPost.id === post.id ? newPost : post))
          );
        }
      }),
    []
  );
};
