import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useLoginMutation } from '../../app/core/api/authApi';
import './Login.css';
import { useAppDispatch } from '../../app/core/redux/store';
import { setAuthData } from '../../app/core/redux/Reducers/authReducer/authReducer';
import { useNavigate } from 'react-router-dom';
import { ToastWrapper, ToastWrapperType } from '../../Common/Components/ToastWrapper/ToastWrapper';
import { AppButton } from '../../Common/Components/AppButton/AppButton';
import { AppLoader } from '../../Common/Components/AppLoader/AppLoader';

export const Login = () => {
  const [login, { isLoading: isLoadingLogin, isError }] = useLoginMutation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const loginHandler = async (email: string, password: string) => {
    try {
      if (email === '') {
        setError('Поле "имя" не заполнено!!');
      } else if (password === '') {
        setError('Поле "пароль" не заполнено!!');
      } else {
        await login({ email, password })
          .unwrap()
          .then((res) => {
            if (res !== null && !isError) {
              dispatch(setAuthData(res));
              ToastWrapper({
                msg: 'Успешно вошли в систему'.replace(/"/g, ''),
                type: ToastWrapperType.success,
              });
              navigate('/');
            }
          });
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      {isLoadingLogin && <AppLoader />}
      <div className="auth_wrap">
        <div className="registration-block">
          <div className="header-block">
            <span>Добро пожаловать</span>
          </div>
          <div className="form-block">
            <div className="form-item">
              <label htmlFor="email">Введите email:</label>

              <input
                type="text"
                value={email}
                placeholder="Введите свой email"
                onChange={(e) => {
                  setError('');
                  setEmail(e.currentTarget.value);
                }}
                name="email"
              />
            </div>
            <div className="form-item">
              <label htmlFor="password">Введите пароль:</label>
              <input
                type="password"
                value={password}
                placeholder="Введите пароль"
                onChange={(e) => {
                  setError('');
                  setPassword(e.currentTarget.value);
                }}
                name="password"
              />
            </div>
            <div className="form-item btn-block">
              <AppButton onClick={() => loginHandler(email, password)} text="Войти" />
              {/*<button className="btn" onClick={()=>loginHandler(email, password)}>Войти</button>*/}
              {error && <div className="error-text">{error}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
