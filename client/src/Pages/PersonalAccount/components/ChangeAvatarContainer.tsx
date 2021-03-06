import React, {ChangeEvent, useState} from 'react';
import styles from "../PersonalAccount.module.css";
import {AppButton} from "../../../Common/Components/AppButton/AppButton";
import {Modal} from "../../../Common/Components/Modal/Modal";
import {getFileType} from "../../../utils/helpers";

interface IChangeAvatarProps {
    file: File | null
    setFile: (file: File | null) => void
    inputFile: string
    setInputFile: (value: string) => void
    changePhoto: boolean
    setChangePhoto: (value: boolean) => void
    handleChangeFile: (event: ChangeEvent<HTMLInputElement>) => void
    uploadUserAvatarHandler: () => Promise<void>
}

export const ChangeAvatarContainer = (
    {
        file,
        setFile,
        changePhoto,
        handleChangeFile,
        setChangePhoto,
        uploadUserAvatarHandler,
        inputFile,
        setInputFile
    }: IChangeAvatarProps) => {
    const [drag, setDrag] = useState(false)

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

    const fileType = getFileType(file?.name)

    return (
        <div>
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
                                <span>?????????????????? ????????, ?????????? ?????????????????? ??????</span>
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
                                    <label htmlFor="file">???????????????? ????????</label>
                                </div>
                                <span>
                      <p>?????? ???????????????????? ?????? ????????.</p>
                    </span>
                                <p className={styles.BottomText}>
                                    ???????? ???????????? ???????? <span className={styles.FileForamt}>JPG, PNG, </span> ??????????????!
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
                                               text={'?????????????????? ?????????? ????????'}
                                    />
                                </div>
                                :
                                <div className={styles.FileErrorBlock}>
                                    <span>???? ?????????????? ???? ???????????? ???????????? ??????????</span>
                                </div>}
                        </React.Fragment>
                    }
                </div>
            </Modal>
        </div>
    );
};