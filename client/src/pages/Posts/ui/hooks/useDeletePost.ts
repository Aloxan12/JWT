import { useDeletePostMutation } from '../../../../app/core/api/postApi';
import React, { useCallback, useState } from 'react';
import { IPost } from '../../../../app/core/api/dto/PostDto';
import { onSuccessNotification } from '../../../../shared/lib/onSuccessNotification';

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
        .then(
          onSuccessNotification('Пост успешно удален', () => {
            setCurrentData((prevState) => prevState.filter((post) => post.id !== id));
            onClose?.();
          })
        )
        .finally(() => setActiveId(null));
    },
    []
  );
  return [deletePostHandler, activeId];
};
