import React from 'react';
import cls from '../PersonalAccount.module.scss';
import { getFileType } from '../../../utils/helpers';
import { AppDragAndDropPhoto } from '../../../shared/ui/AppDragAndDrop/AppDragAndDropPhoto';
import { Flex } from '../../../shared/ui/Flex/Flex';
import { AppButton } from '../../../shared/ui/AppButton/AppButton';
import { AppModal } from '../../../shared/ui/AppModal/Modal';
import { AppInputFile } from '../../../shared/ui/AppInputFile/AppInputFile';

interface IChangeAvatarProps {
  file: File | null;
  setFile: (file: File | null) => void;
  changePhoto: boolean;
  setChangePhoto: (value: boolean) => void;
  uploadUserAvatarHandler: () => void;
}

export const ChangeAvatarContainer = ({
  file,
  setFile,
  changePhoto,
  setChangePhoto,
  uploadUserAvatarHandler,
}: IChangeAvatarProps) => {
  const fileType = getFileType(file?.name);
  const onCloseHandler = () => setChangePhoto(false);
  return (
    <div>
      <AppModal isOpen={changePhoto} onClose={onCloseHandler}>
        <AppDragAndDropPhoto file={file} setFile={setFile} className={cls.dragBlock}>
          <Flex gap="8" direction="column">
            <AppInputFile onChange={setFile} text="Выберите фото" />
            <span>
              <p>Или перенесите его сюда.</p>
            </span>
          </Flex>
          <p className={cls.BottomText}>
            Файл должен быть <span className={cls.FileForamt}>JPG, PNG, </span> формата!
          </p>
        </AppDragAndDropPhoto>
        {!!file && (
          <React.Fragment>
            {fileType.toLowerCase() === 'jpg' || fileType.toLowerCase() === 'png' ? (
              <div className={cls.FileBlock}>
                <span>{file.name}</span>
                <AppButton
                  onClick={() => {
                    uploadUserAvatarHandler();
                  }}
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
    </div>
  );
};
