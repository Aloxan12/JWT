import { useLikePostMutation } from '../../../../app/core/api/postApi';
import React, { useCallback, useState } from 'react';
import { IPost } from '../../../../app/core/api/dto/PostDto';

type UseLikePostResponse = [(id: string) => () => void, string | null];

export const useLikePost = (
  setCurrentData: React.Dispatch<React.SetStateAction<IPost[]>>
): UseLikePostResponse => {
  const [likePost] = useLikePostMutation();
  const [activeId, setActiveId] = useState<string | null>(null);

  const likePostHandler = useCallback(
    (id: string) => () => {
      setActiveId(id);
      likePost({ id })
        .then((res) => {
          const newPost = (res as unknown as { data: { post: IPost } })?.data?.post;
          if (newPost) {
            setCurrentData((prevState) =>
              prevState.map((post) => (newPost.id === post.id ? newPost : post))
            );
          }
        })
        .finally(() => setActiveId(null));
    },
    []
  );
  return [likePostHandler, activeId];
};
