import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './Registration.css';
import { useRegistrationMutation } from '../../redux/api/authApi';
import { ToastWrapper, ToastWrapperType } from '../../Common/Components/ToastWrapper/ToastWrapper';
import { useNavigate } from 'react-router-dom';
import { RoleTypes } from '../../router/AppRoute';
import { AppLoader } from '../../Common/Components/AppLoader/AppLoader';

export const Registration = () => {
  const [registration, { isLoading: isLoadingRegistration, error }] = useRegistrationMutation();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [role, setRole] = useState<RoleTypes | null>(null);
  const [errorText, setErrorText] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === '') {
      setErrorText('Поле "email" не заполнено!!');
    } else if (password.trim().length < 4 && password2.trim().length < 4) {
      setErrorText('Поле пароль должно быть заполнено и быть длинее 4 символов!!');
    } else if (password !== password2) {
      setErrorText('Разные пароли!!');
    } else if (role === null) {
      setErrorText('Не выбрана роль');
    } else {
      try {
        const data = await registration({ email, password, role });
        if (!!data && !error) {
          ToastWrapper({
            msg: 'Писльмо для подтверждаения регистрации отправлено на почту'.replace(/"/g, ''),
            type: ToastWrapperType.success,
          });
          navigate('/login');
          // return () => <AppRedirect path="/" />
        }
      } catch (e) {
        console.log('error', e);
      }
    }
  };

  return (
    <div className="auth_wrap">
      {isLoadingRegistration && <AppLoader />}
      <div className="registration-block">
        <div className="header-block">
          <span>Регистрация</span>
        </div>
        <form onSubmit={handleSubmit} className="form-block">
          <div className="form-item">
            <label htmlFor="email">Введите email:</label>

            <input
              type="text"
              value={email}
              placeholder="Введите свой email"
              onChange={(e) => {
                setErrorText('');
                setSuccess('');
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
                setErrorText('');
                setSuccess('');
                setPassword(e.currentTarget.value);
              }}
              name="password"
            />
          </div>
          <div className="form-item">
            <label htmlFor="password2">Введите еще раз пароль:</label>
            <input
              type="password"
              name="password2"
              value={password2}
              placeholder="Введите ещё раз пароль"
              onChange={(e) => {
                setErrorText('');
                setSuccess('');
                setPassword2(e.currentTarget.value);
              }}
            />
          </div>
          <div className="form-item">
            <label htmlFor="password2">Выберете роль:</label>
            <span>
              <input
                type="radio"
                name="role"
                value="USER"
                onChange={(e) => setRole(e.target.value as RoleTypes)}
              />
              USER
            </span>
            <span>
              <input
                type="radio"
                name="role"
                value="ADMIN"
                onChange={(e) => setRole(e.target.value as RoleTypes)}
              />
              ADMIN
            </span>
          </div>
          <div className="form-item btn-block">
            <input type="submit" className="btn" value="Зарегистрироваться" />
            {errorText && <div className="error-text">{errorText}</div>}
            {success && <div className="success-text">{success}</div>}
          </div>
        </form>
      </div>
    </div>
  );
};
