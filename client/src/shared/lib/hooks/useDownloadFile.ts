import { useEffect } from 'react';
import { downloadFile } from '../downloadFile';
import { AppNotification, ToastWrapperType } from '../../../entities/ToastWrapper/ToastWrapper';

export const useDownloadFile = (
  setFile: (file: File | null) => void,
  file?: string,
  active: boolean = true
) => {
  useEffect(() => {
    if (!!file && active) {
      const downloadAndCreateFiles = async () => {
        const photo = await (file ? downloadFile(file) : null);
        setFile(photo);
      };
      downloadAndCreateFiles().catch(() =>
        AppNotification({
          msg: 'При загрузке фото произошла ошибка',
          type: ToastWrapperType.error,
        })
      );
    }
  }, [active]);
};
