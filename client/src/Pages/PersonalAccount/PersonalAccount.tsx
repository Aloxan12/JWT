import React, {ChangeEvent, useEffect, useState} from 'react';
import styles from './PersonalAccount.module.css'
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {RoleTypes} from "../../router/AppRoute";
import {AppButton} from "../../Common/Components/AppButton/AppButton";
import {Modal} from "../../Common/Components/Modal/Modal";
import {useUploadUserAvatarMutation} from "../../redux/usersApi";

export const PersonalAccount = () => {
    const {id} = useParams()
    const user = useSelector((state: RootState) => state.auth.authData.user)

    const [uploadUserAvatar] = useUploadUserAvatarMutation()

    const [changePhoto, setChangePhoto] = useState(false)
    const [drag, setDrag] = useState(false)
    const [file, setFile] = useState<null | File>(null)
    const [inputFile, setInputFile] = useState<string>('')


    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDrag(true)
    }
    const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDrag(false)
    }
    const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        const file = e.dataTransfer.files
        setFile(file[0])
        setDrag(false)
    }

    const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0]
        setFile(file)
    }

    useEffect(()=>{
        if(!changePhoto){
            setInputFile('')
            setFile(null)
        }
    },[changePhoto])
    const fileType = `${file?.name}`
        .split('')
        .reverse()
        .join('')
        .split('.')[0]
        .split('')
        .reverse()
        .join('')

    const uploadUserAvatarHandler = async ()=>{
        if(!!file && !!id){
            const formData = new FormData()
            formData.append('img', file)
            const res = await uploadUserAvatar({id, img: file })
            console.log('file',formData)
        }
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
                            <Modal active={changePhoto} setActive={setChangePhoto}>
                                <div className={styles.SelectFileBlock}>
                                    <div className={styles.DropBlock}>
                                        {drag ? (
                                            <div
                                                className={styles.DropItem + ' ' + styles.DropArea}
                                                onDragStart={(e) => dragStartHandler(e)}
                                                onDragLeave={(e) => dragLeaveHandler(e)}
                                                onDragOver={(e) => dragStartHandler(e)}
                                                onDrop={(e) => onDropHandler(e)}
                                            >
                                                <span>Отпустите файл, чтобы загрузить его</span>
                                            </div>
                                        ) : (
                                            <div
                                                className={styles.DropItem}
                                                onDragStart={(e) => dragStartHandler(e)}
                                                onDragLeave={(e) => dragLeaveHandler(e)}
                                                onDragOver={(e) => dragStartHandler(e)}
                                            >
                                                <div className={styles.BtnChooseFile}>
                                                    <input
                                                        type="file"
                                                        name="file"
                                                        id="file"
                                                        accept={'image/*'}
                                                        value={inputFile}
                                                        className={styles.InputFile}
                                                        onChange={(e) => {
                                                            setInputFile(e.target.value)
                                                            handleChangeFile(e)
                                                        }}
                                                    />
                                                    <label htmlFor="file">Выберите фото</label>
                                                </div>
                                                <span>
                      <p>Или перенесите его сюда.</p>
                    </span>
                                                <p className={styles.BottomText}>
                                                    Файл должен быть <span className={styles.FileForamt}>JPG, PNG, </span> формата!
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    {!!file &&
                                    <React.Fragment>
                                        {(fileType.toLowerCase() === 'jpg' || fileType.toLowerCase() === 'png')
                                            ? <div className={styles.FileBlock}>
                                                <span>{file.name}</span>
                                                <AppButton onClick={uploadUserAvatarHandler}
                                                           text={'Сохранить новое фото'}
                                                />
                                            </div>
                                            :
                                            <div className={styles.FileErrorBlock}>
                                                <span>Вы выбрали не верный формат файла</span>
                                            </div>}
                                    </React.Fragment>
                                    }
                                </div>
                            </Modal>
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
