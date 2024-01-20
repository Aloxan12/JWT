import React from 'react';
import cls from '../PersonalAccount.module.scss';
import { getFileType } from '../../../utils/helpers';
import { AppDragAndDropPhoto } from '../../../shared/ui/AppDragAndDrop/AppDragAndDropPhoto';
import { Flex } from '../../../shared/ui/Flex/Flex';
import { AppButton } from '../../../shared/ui/AppButton/AppButton';
import { AppModal } from '../../../shared/ui/AppModal/Modal';
import { AppInputFile } from '../../../shared/ui/AppInputFile/AppInputFile';
import { useUploadUserAvatarMutation } from '../../../app/core/api/usersApi';

interface IChangeAvatarProps {
  file: File | null;
  setFile: (file: File | null) => void;
  userId: string;
  isChangePhotoModal: boolean;
  setIsChangePhotoModal: (value: boolean) => void;
}

export const ChangeAvatarContainer = ({
  file,
  setFile,
  isChangePhotoModal,
  setIsChangePhotoModal,
  userId,
}: IChangeAvatarProps) => {
  const [uploadUserAvatar, { isLoading: isLoadingUpdate }] = useUploadUserAvatarMutation();

  const fileType = getFileType(file?.name);
  const onCloseHandler = () => setIsChangePhotoModal(false);

  const uploadUserAvatarHandler = () => {
    if (!!file && !!userId) {
      const formData = new FormData();
      formData.append('img', file);
      uploadUserAvatar({ id: userId, img: file }).unwrap().then(onCloseHandler);
    }
  };

  return (
    <AppModal isOpen={isChangePhotoModal} onClose={onCloseHandler}>
      <AppDragAndDropPhoto file={file} setFile={setFile} className={cls.dragBlock}>
        <Flex gap="8" direction="column">
          <AppInputFile onChange={setFile} text="Выберите фото" />
          <span>
            <p>Или перенесите его сюда.</p>
          </span>
        </Flex>
        <p className={cls.BottomText}>
          Файл должен быть <span className={cls.FileFormat}>JPG, PNG, </span> формата!
        </p>
      </AppDragAndDropPhoto>
      {!!file && (
        <React.Fragment>
          {fileType.toLowerCase() === 'jpg' || fileType.toLowerCase() === 'png' ? (
            <div className={cls.FileBlock}>
              <span>{file.name}</span>
              <AppButton
                onClick={uploadUserAvatarHandler}
                isLoading={isLoadingUpdate}
                text="Сохранить новое фото"
                max
              />
            </div>
          ) : (
            <div className={cls.FileErrorBlock}>
              <span>Вы выбрали не верный формат файла</span>
            </div>
          )}
        </React.Fragment>
      )}
    </AppModal>
  );
};
