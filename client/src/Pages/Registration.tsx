import React, {useEffect, useState} from "react";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import './Registration.css'
import {authApi, useGetAllUsersQuery, useRegistrationMutation} from "../redux/authApi";
import { ToastWrapper, ToastWrapperType} from "../Common/Components/ToastWrapper/ToastWrapper";
import {toast, ToastContainer} from "react-toastify";

interface IError{
    error: {
        status: number
        message: string
    }
}

export const Registration = () => {
    const [registration, {isLoading}] = useRegistrationMutation()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [errorText, setErrorText] = useState('')
    const [success, setSuccess] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (email === '') {
            setErrorText('Поле "email" не заполнено!!')
        } else if (password.length < 4 && password2.length < 4) {
            setErrorText('Поле пароль должно быть заполнено и быть длинее 4 символов!!')
        } else if (password !== password2) {
            setErrorText('Разные пароли!!')
        } else {
            try {
                const data = await registration({email, password})
                console.log('successRegistration', data)
            } catch (e) {
                console.log('error', e)
            }
        }
    };

    return (
        <div className="auth_wrap">
            {isLoading && <h1>Идет загрузка</h1>}
            <div className="registration-block">
                <div className="header-block"><span>Регистрация</span></div>
                <form onSubmit={handleSubmit} className="form-block">
                    <div className="form-item">
                        <label htmlFor="email">Введите email:</label>

                        <input type="text" value={email} placeholder="Введите свой email" onChange={(e) => {
                            setErrorText('')
                            setSuccess('')
                            setEmail(e.currentTarget.value)
                        }} name="email"/>
                    </div>
                    <div className="form-item">
                        <label htmlFor="password">Введите пароль:</label>
                        <input type="password" value={password} placeholder="Введите пароль" onChange={(e) => {
                            setErrorText('')
                            setSuccess('')
                            setPassword(e.currentTarget.value)
                        }} name="password"/>
                    </div>
                    <div className="form-item">
                        <label htmlFor="password2">Введите еще раз пароль:</label>
                        <input type="password" name="password2" value={password2} placeholder="Введите ещё раз пароль"
                               onChange={(e) => {
                                   setErrorText('')
                                   setSuccess('')
                                   setPassword2(e.currentTarget.value)
                               }}/>
                    </div>
                    <div className="form-item btn-block">
                        <input type="submit" className="btn" value="Зарегестрироваться"/>
                        {errorText && <div className="error-text">{errorText}</div>}
                        {success && <div className="success-text">{success}</div>}
                    </div>
                </form>
            </div>
        </div>
    )
}