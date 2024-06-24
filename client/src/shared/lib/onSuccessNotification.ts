import { ToastWrapper, ToastWrapperType } from '../../entities/ToastWrapper/ToastWrapper';

export const onSuccessNotification = (text: string, callback?: () => void) => () => {
  ToastWrapper({ msg: text.replace(/"/g, ''), type: ToastWrapperType.success });
  callback?.();
};

export const onErrorNotification = (text: string) => () => {
  ToastWrapper({ msg: text.replace(/"/g, ''), type: ToastWrapperType.error });
};
