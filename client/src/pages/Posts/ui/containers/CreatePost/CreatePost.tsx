import { AppTextarea } from '../../../../../shared/ui/AppTextarea/AppTextarea';
import { AppButton } from '../../../../../shared/ui/AppButton/AppButton';
import { Flex } from '../../../../../shared/ui/Flex/Flex';
import React, { useState } from 'react';
import {
  AppNotification,
  ToastWrapperType,
} from '../../../../../entities/ToastWrapper/ToastWrapper';
import { useCreatePostsMutation } from '../../../../../app/core/api/postApi';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../app/core/redux/store';
import { IUser } from '../../../../../app/core/api/dto/UserDto';
import { IPost } from '../../../../../app/core/api/dto/PostDto';

interface CreatePostProps {
  setCurrentData: React.Dispatch<React.SetStateAction<IPost[]>>;
}

export const CreatePost = ({ setCurrentData }: CreatePostProps) => {
  const user = useSelector<RootState, IUser | null>((state) => state.auth.user);
  const [postText, setPostText] = useState('');

  const [createPost, { isLoading: isLoadingCreate }] = useCreatePostsMutation();

  const createPostHandler = () => {
    if (user && postText !== '') {
      createPost({ author: user.id, postText, publicDate: moment(new Date()).toISOString() })
        .unwrap()
        .then((post) => {
          setPostText('');
          setCurrentData((prevState) => [post, ...prevState]);
          AppNotification({
            msg: 'Пост опубликован'.replace(/"/g, ''),
            type: ToastWrapperType.success,
          });
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
        disabled={!postText.trim()}
        isLoading={isLoadingCreate}
      />
    </Flex>
  );
};
