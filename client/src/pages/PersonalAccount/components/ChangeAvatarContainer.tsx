import React, { useState } from 'react';
import cls from '../PersonalAccount.module.scss';
import { AppDragAndDropPhoto } from '../../../shared/ui/AppDragAndDrop/AppDragAndDropPhoto';
import { Flex } from '../../../shared/ui/Flex/Flex';
import { AppButton } from '../../../shared/ui/AppButton/AppButton';
import { AppModal } from '../../../shared/ui/AppModal/Modal';
import { AppInputFile } from '../../../shared/ui/AppInputFile/AppInputFile';
import { useUploadUserAvatarMutation } from '../../../app/core/api/usersApi';
import {
  ToastWrapper,
  ToastWrapperType,
} from '../../../Common/Components/ToastWrapper/ToastWrapper';

interface IChangeAvatarProps {
  userId: string;
  isChangePhotoModal: boolean;
  setIsChangePhotoModal: (value: boolean) => void;
}

export const ChangeAvatarContainer = ({
  isChangePhotoModal,
  setIsChangePhotoModal,
  userId,
}: IChangeAvatarProps) => {
  const [file, setFile] = useState<null | File>(null);
  const [uploadUserAvatar, { isLoading: isLoadingUpdate }] = useUploadUserAvatarMutation();

  const onCloseHandler = () => setIsChangePhotoModal(false);

  const uploadUserAvatarHandler = () => {
    if (!!file && !!userId) {
      const formData = new FormData();
      formData.append('img', file);
      uploadUserAvatar({ id: userId, img: file }).unwrap().then(onCloseHandler);
    }
  };
  const setFileHandler = (file: File | null) => {
    if (file) {
      if (file.type.includes('image')) {
        setFile(file);
      } else {
        ToastWrapper({
          msg: 'Файл не правильного формата',
          type: ToastWrapperType.error,
        });
      }
    } else {
      setFile(file);
    }
  };

  return (
    <AppModal isOpen={isChangePhotoModal} onClose={onCloseHandler}>
      <Flex direction="column" gap="16">
        <AppDragAndDropPhoto file={file} setFile={setFileHandler} className={cls.dragBlock}>
          <Flex gap="8" direction="column">
            <AppInputFile onChange={setFileHandler} text="Выберите фото" />
            <span>
              <p>Или перенесите его сюда.</p>
            </span>
          </Flex>
          <p className={cls.BottomText}>
            Файл должен быть <span className={cls.FileFormat}>JPG, PNG, </span> формата!
          </p>
        </AppDragAndDropPhoto>
        <Flex gap="16" max>
          <AppButton onClick={onCloseHandler} disabled={isLoadingUpdate} text="Отмена" max />
          <AppButton
            theme="full-bg"
            disabled={!file}
            onClick={uploadUserAvatarHandler}
            isLoading={isLoadingUpdate}
            text="Сохранить"
            max
          />
        </Flex>
      </Flex>
    </AppModal>
  );
};
