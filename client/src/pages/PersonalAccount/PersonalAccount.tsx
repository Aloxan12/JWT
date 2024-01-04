import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './PersonalAccount.module.css';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppButton } from '../../Common/Components/AppButton/AppButton';
import { useGetUserDetailQuery, useUploadUserAvatarMutation } from '../../app/core/api/usersApi';
import { setUser } from '../../app/core/redux/Reducers/auth/authSlice';
import { ChangeAvatarContainer } from './components/ChangeAvatarContainer';
import { ProfileInfoContainer } from './components/ProfileInfoContainer';
import fakeAvatar from '../../utils/images/fake_avatar.png';
import { IUser } from '../../app/core/api/dto/UserDto';
import { AppLoader } from '../../Common/Components/AppLoader/AppLoader';

export const PersonalAccount = () => {
  const { id } = useParams();
  const {
    data: user,
    isLoading: isLoadingCurrent,
    isFetching: isFetchingCurrent,
  } = useGetUserDetailQuery({ id: id! }, { skip: !id });

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

  const uploadUserAvatarHandler = async () => {
    if (!!file && !!id) {
      const formData = new FormData();
      formData.append('img', file);
      const res = await uploadUserAvatar({ id, img: file });
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
    <div className={styles.PersonalAccountWrap}>
      {(isLoadingCurrent || isFetchingCurrent || isLoadingUpdate) && <AppLoader />}
      <div className={styles.PersonalAccountMainBlock}>
        <div className={styles.PersonalAccountPhotoBlock}>
          <img
            className={styles.PersonalAccountPhoto}
            src={user && user.avatar ? user!.avatar : fakeAvatar}
            alt="avatar"
          />
          <div className={styles.ChangePhotoBtn}>
            <AppButton onClick={() => setChangePhoto(true)} text={'Сменить фото'} />
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