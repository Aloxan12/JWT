import React, {ChangeEvent, useEffect, useState} from 'react';
import styles from './PersonalAccount.module.css'
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {RoleTypes} from "../../router/AppRoute";
import {AppButton} from "../../Common/Components/AppButton/AppButton";
import {useGetUserDetailQuery, useUploadUserAvatarMutation} from "../../redux/usersApi";
import {checkAuthApi} from "../../redux/checkAuthApi";
import {IUser, setUser} from "../../redux/Reducers/authReducer/authReducer";
import {ChangeAvatarContainer} from "./components/ChangeAvatar";

export const PersonalAccount = () => {
    const {id} = useParams()
    const {data: user} = useGetUserDetailQuery({id: id!}, {skip: !id})

    const [uploadUserAvatar] = useUploadUserAvatarMutation()
    const dispatch = useDispatch()

    const [changePhoto, setChangePhoto] = useState(false)
    const [file, setFile] = useState<null | File>(null)
    const [inputFile, setInputFile] = useState<string>('')

    const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0]
        setFile(file)
    }

    useEffect(() => {
        if (!changePhoto) {
            setInputFile('')
            setFile(null)
        }
    }, [changePhoto])

    const uploadUserAvatarHandler = async () => {
        if (!!file && !!id) {
            const formData = new FormData()
            formData.append('img', file)
            const res = await uploadUserAvatar({id, img: file})
            if (!!res) {
                await checkAuthApi()
                // @ts-ignore
                dispatch(setUser(res.data ? res.data as IUser : null))
                setChangePhoto(false)
            }
        }
    }
    if (!user) {
        return null
    }

    return (
        <div className={styles.PersonalAccountWrap}>
            <div className={styles.PersonalAccountMainBlock}>
                <div className={styles.PersonalAccountPhotoBlock}>
                    <img
                        className={styles.PersonalAccountPhoto}
                        src={user!.avatar ? `http://localhost:5555/` + user!.avatar : 'фейк'}/>
                    <div className={styles.ChangePhotoBtn}>
                        <AppButton
                            onClick={() => setChangePhoto(true)} text={'Сменить фото'}/>
                        {changePhoto && (
                            <ChangeAvatarContainer file={file} setFile={setFile} inputFile={inputFile}
                                                   setInputFile={setInputFile} changePhoto={changePhoto}
                                                   setChangePhoto={setChangePhoto} handleChangeFile={handleChangeFile}
                                                   uploadUserAvatarHandler={uploadUserAvatarHandler}/>
                        )}
                    </div>
                </div>
                <div className={styles.PersonalAccountInfoBlock}>
                    <h3 className={styles.PersonalAccountInfoTitle}>Личная информация</h3>
                    <div className={styles.PersonalAccountInfoItem}>
                        <span>Email: <b>{user?.email}</b></span>
                    </div>
                    <div className={styles.PersonalAccountInfoItem}>
                        <span>Роль: <b>{user?.role === RoleTypes.ADMIN ? 'Администратор' : 'Пользователь'}</b></span>
                    </div>
                    <div className={styles.PersonalAccountInfoItem}>
                        <span>Активирован: <b>{user?.isActivated ? 'Да' : 'Нет'}</b></span>
                    </div>
                </div>
            </div>
        </div>
    );
};
