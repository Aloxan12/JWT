import React, {useState} from "react";
import 'react-toastify/dist/ReactToastify.css';
import { useLoginMutation } from "../../redux/authApi";
import './Login.css'
import {AppDispatch, useAppDispatch} from "../../redux/store";
import {setAuthData} from "../../redux/Reducers/authReducer/authReducer";


export const Login = () => {
    const [login, {isError}] = useLoginMutation()

    const dispatch = useAppDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const loginHandler = async (email: string, password: string) => {
        try {
            if(email === ''){
                setError('Поле "имя" не заполнено!!')
            }else if(password === ''){
                setError('Поле "пароль" не заполнено!!')
            }else {
                await login({email, password}).then(data => {
                    if (!isError) {
                        dispatch(setAuthData(data))
                    }
                })
            }
        }catch (e) {console.log(e)}
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(email === ''){
            setError('Поле "имя" не заполнено!!')
        }else {
            // await axios.post('http://localhost:9000/api/login',{
            //     username: name,
            //     password: password
            // })
        }
    };

    return(
        <div>
            <div className="auth_wrap">
                <div className="registration-block">
                    <div className="header-block"><span>Добро пожаловать</span></div>
                    <form className="form-block">
                        <div className="form-item">
                            <label htmlFor="email">Введите email:</label>

                            <input type="email" value={email} placeholder="Введите свой email" onChange={(e) => {
                                setError('')
                                setEmail(e.currentTarget.value)
                            }} name="email"/>
                        </div>
                        <div className="form-item">
                            <label htmlFor="password">Введите пароль:</label>
                            <input type="password" value={password} placeholder="Введите пароль" onChange={(e)=>{
                                setError('')
                                setPassword(e.currentTarget.value)
                            }} name="password"/>
                        </div>
                        <div className="form-item btn-block">
                            <button className="btn" onClick={()=>loginHandler(email, password)}>Войти</button>
                            {error && <div className="error-text">{error}</div>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}