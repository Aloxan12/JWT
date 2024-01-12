import React, { ChangeEvent, useEffect, useState } from 'react';
import cls from './PersonalAccount.module.scss';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useUploadUserAvatarMutation } from '../../app/core/api/usersApi';
import { setUser } from '../../app/core/redux/Reducers/auth/authSlice';
import { ChangeAvatarContainer } from './components/ChangeAvatarContainer';
import { ProfileInfoContainer } from './components/ProfileInfoContainer';
import { IUser } from '../../app/core/api/dto/UserDto';
import { AppLoader } from '../../Common/Components/AppLoader/AppLoader';
import { useAppSelector } from '../../app/core/redux/store';
import { AppPhoto } from '../../shared/ui/AppPhoto/AppPhoto';
import { AppButton } from '../../shared/ui/AppButton/AppButton';

export const PersonalAccount = () => {
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.auth);

  const [uploadUserAvatar, { isLoading: isLoadingUpdate }] = useUploadUserAvatarMutation();
  const dispatch = useDispatch();

  const [changePhoto, setChangePhoto] = useState(false);
  const [file, setFile] = useState<null | File>(null);
  const [inputFile, setInputFile] = useState<string>('');

  const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setFile(file);
  };

  useEffect(() => {
    if (!changePhoto) {
      setInputFile('');
      setFile(null);
    }
  }, [changePhoto]);

  const uploadUserAvatarHandler = () => {
    if (!!file && !!id) {
      const formData = new FormData();
      formData.append('img', file);
      const res = uploadUserAvatar({ id, img: file });
      console.log('dsad');
      if (!!res) {
        // @ts-ignore
        dispatch(setUser(res.data ? (res.data as IUser) : null));
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
        <div className={cls.PersonalAccountPhotoBlock}>
          <AppPhoto
            className={cls.PersonalAccountPhoto}
            src={user.avatar ? `${user.avatar}/view` : undefined}
            alt="avatar"
          />
          <div className={cls.ChangePhotoBtn}>
            <AppButton onClick={() => setChangePhoto(true)} text="Сменить фото" theme="full-bg" />
            {changePhoto && (
              <ChangeAvatarContainer
                file={file}
                setFile={setFile}
                inputFile={inputFile}
                setInputFile={setInputFile}
                changePhoto={changePhoto}
                setChangePhoto={setChangePhoto}
                handleChangeFile={handleChangeFile}
                uploadUserAvatarHandler={uploadUserAvatarHandler}
              />
            )}
          </div>
        </div>
        <ProfileInfoContainer user={user} />
      </div>
    </div>
  );
};
