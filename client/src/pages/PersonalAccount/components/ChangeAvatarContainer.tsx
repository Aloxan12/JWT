import React, { ChangeEvent } from 'react';
import cls from '../PersonalAccount.module.scss';
import { Modal } from '../../../Common/Components/Modal/Modal';
import { getFileType } from '../../../utils/helpers';
import { AppDragAndDropPhoto } from '../../../shared/ui/AppDragAndDrop/AppDragAndDropPhoto';
import { Flex } from '../../../shared/ui/Flex/Flex';
import { AppButton } from '../../../shared/ui/AppButton/AppButton';

interface IChangeAvatarProps {
  file: File | null;
  setFile: (file: File | null) => void;
  inputFile: string;
  setInputFile: (value: string) => void;
  changePhoto: boolean;
  setChangePhoto: (value: boolean) => void;
  handleChangeFile: (event: ChangeEvent<HTMLInputElement>) => void;
  uploadUserAvatarHandler: () => void;
}

export const ChangeAvatarContainer = ({
  file,
  setFile,
  changePhoto,
  handleChangeFile,
  setChangePhoto,
  uploadUserAvatarHandler,
  inputFile,
  setInputFile,
}: IChangeAvatarProps) => {
  const fileType = getFileType(file?.name);

  return (
    <div>
      <Modal active={changePhoto} setActive={setChangePhoto}>
        <div className={cls.SelectFileBlock}>
          <AppDragAndDropPhoto file={file} setFile={setFile} className={cls.dragBlock}>
            <Flex gap="8" direction="column">
              <div className={cls.BtnChooseFile}>
                <input
                  type="file"
                  name="file"
                  id="file"
                  accept={'image/*'}
                  value={inputFile}
                  className={cls.InputFile}
                  onChange={(e) => {
                    setInputFile(e.target.value);
                    handleChangeFile(e);
                  }}
                />
                <label htmlFor="file">Выберите фото</label>
              </div>
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
        </div>
      </Modal>
    </div>
  );
};
