import { AppTextarea } from '../../../../../shared/ui/AppTextarea/AppTextarea';
import { AppButton } from '../../../../../shared/ui/AppButton/AppButton';
import { Flex } from '../../../../../shared/ui/Flex/Flex';
import React, { useState } from 'react';
import {
  ToastWrapper,
  ToastWrapperType,
} from '../../../../../Common/Components/ToastWrapper/ToastWrapper';
import { useCreatePostsMutation } from '../../../../../app/core/api/postApi';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../app/core/redux/store';
import { IUser } from '../../../../../app/core/api/dto/UserDto';

interface CreatePostProps {
  setCurrentPage: (page: number) => void;
}

export const CreatePost = ({ setCurrentPage }: CreatePostProps) => {
  const user = useSelector<RootState, IUser | null>((state) => state.auth.user);
  const [postText, setPostText] = useState('');

  const [createPost, { isLoading: isLoadingCreate }] = useCreatePostsMutation();

  const createPostHandler = () => {
    if (user && postText !== '') {
      createPost({ author: user.id, postText, publicDate: moment(new Date()).toISOString() });
      setPostText('');
      setCurrentPage(1);
      ToastWrapper({
        msg: 'Пост опубликован'.replace(/"/g, ''),
        type: ToastWrapperType.success,
      });
    }
  };

  return (
    <Flex direction="column" align="start" max gap="16">
      <AppTextarea value={postText} onChange={setPostText} fullWidth rows="3" />
      <AppButton
        title="Опубликовать"
        onClick={createPostHandler}
        theme="full-bg"
        disabled={!postText}
        isLoading={isLoadingCreate}
      />
    </Flex>
  );
};
