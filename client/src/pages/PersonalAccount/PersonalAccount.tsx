import React, { useState } from 'react';
import cls from './PersonalAccount.module.scss';
import { useUploadUserAvatarMutation } from '../../app/core/api/usersApi';
import { ChangeAvatarContainer } from './components/ChangeAvatarContainer';
import { ProfileInfoContainer } from './components/ProfileInfoContainer';
import { AppLoader } from '../../Common/Components/AppLoader/AppLoader';
import { useAppSelector } from '../../app/core/redux/store';
import { AppPhoto } from '../../shared/ui/AppPhoto/AppPhoto';
import { AppButton } from '../../shared/ui/AppButton/AppButton';
import { Flex } from '../../shared/ui/Flex/Flex';

export const PersonalAccount = () => {
  const { user } = useAppSelector((state) => state.auth);

  const [uploadUserAvatar, { isLoading: isLoadingUpdate }] = useUploadUserAvatarMutation();

  const [changePhoto, setChangePhoto] = useState(false);
  const [file, setFile] = useState<null | File>(null);

  const uploadUserAvatarHandler = () => {
    if (!!file && !!user?.id) {
      const formData = new FormData();
      formData.append('img', file);
      const res = uploadUserAvatar({ id: user?.id, img: file });
      if (!!res) {
        setChangePhoto(false);
      }
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className={cls.PersonalAccountWrap}>
      {isLoadingUpdate && <AppLoader />}
      <div className={cls.PersonalAccountMainBlock}>
        <Flex direction="column" gap="8" align="start">
          <AppPhoto className={cls.mainPhoto} src={user.avatar} alt="avatar" />
          <AppButton onClick={() => setChangePhoto(true)} text="Сменить фото" theme="full-bg" />
          {changePhoto && (
            <ChangeAvatarContainer
              file={file}
              setFile={setFile}
              changePhoto={changePhoto}
              setChangePhoto={setChangePhoto}
              uploadUserAvatarHandler={uploadUserAvatarHandler}
            />
          )}
        </Flex>
        <ProfileInfoContainer user={user} />
      </div>
    </div>
  );
};
