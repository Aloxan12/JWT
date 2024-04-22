import { useDeletePostMutation } from '../../../../app/core/api/postApi';
import { ToastWrapper, ToastWrapperType } from '../../../../entities/ToastWrapper/ToastWrapper';
import React, { useCallback, useState } from 'react';
import { IPost } from '../../../../app/core/api/dto/PostDto';

type UseDeletePostResponse = [(id: string) => (onClose?: () => void) => void, string | null];

export const useDeletePost = (
  setCurrentData: React.Dispatch<React.SetStateAction<IPost[]>>
): UseDeletePostResponse => {
  const [deletePost] = useDeletePostMutation();
  const [activeId, setActiveId] = useState<string | null>(null);

  const deletePostHandler = useCallback(
    (id: string) => (onClose?: () => void) => {
      setActiveId(activeId);
      deletePost({ id })
        .unwrap()
        .then(() => {
          ToastWrapper({
            msg: 'Пост успешно удален',
            type: ToastWrapperType.info,
          });
          setCurrentData((prevState) => prevState.filter((post) => post.id !== id));
          onClose?.();
        })
        .finally(() => setActiveId(null));
    },
    []
  );

  return [deletePostHandler, activeId];
};
