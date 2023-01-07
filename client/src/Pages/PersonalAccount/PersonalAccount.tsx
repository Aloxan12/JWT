import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './PersonalAccount.module.css';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppButton } from '../../Common/Components/AppButton/AppButton';
import { useGetUserDetailQuery, useUploadUserAvatarMutation } from '../../redux/api/usersApi';
import { checkAuthApi } from '../../redux/api/checkAuthApi';
import { setUser } from '../../redux/Reducers/authReducer/authReducer';
import { ChangeAvatarContainer } from './components/ChangeAvatarContainer';
import { ProfileInfoContainer } from './components/ProfileInfoContainer';
import fakeAvatar from '../../utils/images/fake_avatar.png';
import { IUser } from '../../redux/api/dto/UserDto';
import { host } from '../../redux/api/authApi';

export const PersonalAccount = () => {
  const { id } = useParams();
  const { data: user } = useGetUserDetailQuery({ id: id! }, { skip: !id });

  const [uploadUserAvatar] = useUploadUserAvatarMutation();
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
        await checkAuthApi();
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
      <div className={styles.PersonalAccountMainBlock}>
        <div className={styles.PersonalAccountPhotoBlock}>
          <img
            className={styles.PersonalAccountPhoto}
            src={user && user.avatar ? user!.avatar : fakeAvatar}
            alt={'avatar'}
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
