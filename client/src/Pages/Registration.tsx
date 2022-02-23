import React, {useEffect, useState} from "react";
import axios from "axios";
import './Registration.css'
import {useGetAllUsersQuery, useRegistrationMutation} from "../redux/authApi";

export const Registration = () => {
    const {data: users, error} = useGetAllUsersQuery({})
    const [registration] = useRegistrationMutation()

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
                await registration({email, password})
                console.log('error', error)
            }catch (e) {
            }
        }
    };

    useEffect(()=>{
        console.log('users', users)
        if(error){
            console.log('data' in error)
        }
    },[])

    return (
        <div className="auth_wrap">
            <div className="registration-block">
                <div className="header-block"><span>Регистрация</span></div>
                <form onSubmit={handleSubmit} className="form-block">
                    <div className="form-item">
                        <label htmlFor="name">Введите email:</label>

                        <input type="text" value={email} placeholder="Введите свой email" onChange={(e) => {
                            setErrorText('')
                            setSuccess('')
                            setEmail(e.currentTarget.value)
                        }} name="name"/>
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