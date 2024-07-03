import { AppNotification, ToastWrapperType } from '../../entities/ToastWrapper/ToastWrapper';

export const onSuccessNotification = (text: string, callback?: () => void) => () => {
  AppNotification({ msg: text.replace(/"/g, ''), type: ToastWrapperType.success });
  callback?.();
};

export const onErrorNotification = (text: string) => () => {
  AppNotification({ msg: text.replace(/"/g, ''), type: ToastWrapperType.error });
};
