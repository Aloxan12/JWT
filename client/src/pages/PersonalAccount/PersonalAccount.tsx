import React, { useState } from 'react';
import cls from './PersonalAccount.module.scss';
import { ChangeAvatarContainer } from './components/ChangeAvatarContainer';
import { ProfileInfoContainer } from './components/ProfileInfoContainer';
import { useAppSelector } from '../../app/core/redux/store';
import { AppPhoto } from '../../shared/ui/AppPhoto/AppPhoto';
import { AppButton } from '../../shared/ui/AppButton/AppButton';
import { Flex } from '../../shared/ui/Flex/Flex';

export const PersonalAccount = () => {
  const { user } = useAppSelector((state) => state.auth);

  const [isChangePhotoModal, setIsChangePhotoModal] = useState(false);

  const openPhotoModalHandler = () => setIsChangePhotoModal(true);

  if (!user) {
    return null;
  }

  return (
    <div className={cls.personalAccountWrap}>
      <div className={cls.personalAccountMainBlock}>
        <Flex direction="column" gap="8" align="start" className={cls.photoWrap}>
          <AppPhoto className={cls.mainPhoto} src={user.avatar} alt="avatar" />
          <AppButton onClick={openPhotoModalHandler} text="Сменить фото" theme="full-bg" />
          <ChangeAvatarContainer
            isChangePhotoModal={isChangePhotoModal}
            setIsChangePhotoModal={setIsChangePhotoModal}
            userId={user.id}
          />
        </Flex>
        <ProfileInfoContainer user={user} />
      </div>
    </div>
  );
};
