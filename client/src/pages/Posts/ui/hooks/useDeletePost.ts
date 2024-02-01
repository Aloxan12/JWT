import { useDeletePostMutation } from '../../../../app/core/api/postApi';
import {
  ToastWrapper,
  ToastWrapperType,
} from '../../../../Common/Components/ToastWrapper/ToastWrapper';
import React, { useCallback } from 'react';
import { IPost } from '../../../../app/core/api/dto/PostDto';

type UseDeletePostResponse = [(id: string) => (onClose?: () => void) => void, boolean];

export const useDeletePost = (
  setCurrentData: React.Dispatch<React.SetStateAction<IPost[]>>
): UseDeletePostResponse => {
  const [deletePost, { isLoading }] = useDeletePostMutation();

  const deletePostHandler = useCallback(
    (id: string) => (onClose?: () => void) => {
      deletePost({ id }).then(() => {
        ToastWrapper({
          msg: 'Пост успешно удален',
          type: ToastWrapperType.info,
        });
        setCurrentData((prevState) => prevState.filter((post) => post.id !== id));
        onClose?.();
      });
    },
    []
  );

  return [deletePostHandler, isLoading];
};
