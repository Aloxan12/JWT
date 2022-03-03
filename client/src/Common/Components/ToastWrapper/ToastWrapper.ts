import { toast } from 'react-toastify'

export enum ToastWrapperType {
    error = 'error',
    success = 'success',
    info = 'info',
    warning = 'warning',
    warn = 'warn',
}

export interface IToastWrapper {
    msg: string
    type: ToastWrapperType
}

export const ToastWrapper = ({
                                 msg,
                                 type = ToastWrapperType.error,
                             }: IToastWrapper) => {
    toast[type](msg, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    })
}