import { useEffect } from 'react';
import { downloadFile } from '../downloadFile';
import {
  ToastWrapper,
  ToastWrapperType,
} from '../../../Common/Components/ToastWrapper/ToastWrapper';

export const useDownloadFile = (setFile: (file: File | null) => void, file?: string) => {
  useEffect(() => {
    if (!!file) {
      const downloadAndCreateFiles = async () => {
        const photo = await (file ? downloadFile(file) : null);
        setFile(photo);
      };
      downloadAndCreateFiles().catch(() =>
        ToastWrapper({
          msg: 'При загрузке фото произошла ошибка',
          type: ToastWrapperType.error,
        })
      );
    }
  }, []);
};
