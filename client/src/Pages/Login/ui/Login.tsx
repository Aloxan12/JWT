import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useLoginMutation } from '../../../app/core/api/authApi';
import { useAppDispatch } from '../../../app/core/redux/store';
import { setAuthData } from '../../../app/core/redux/Reducers/authReducer/authReducer';
import { useNavigate } from 'react-router-dom';
import {
  ToastWrapper,
  ToastWrapperType,
} from '../../../Common/Components/ToastWrapper/ToastWrapper';
import { AppLoader } from '../../../Common/Components/AppLoader/AppLoader';
import { AppInput } from '../../../shared/ui/AppInput/AppInput';
import { AppButton } from '../../../shared/ui/AppButton/AppButton';
import { Flex } from '../../../shared/ui/Flex/Flex';
import { AppCard } from '../../../shared/ui/AppCard/AppCard';
import { AppTitle } from '../../../shared/ui/AppTitle/AppTitle';
import cls from './Login.module.scss';
import { AppText } from '../../../shared/ui/AppText/AppText';

const Login = () => {
  const [login, { isLoading: isLoadingLogin, isError }] = useLoginMutation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const loginHandler = () => {
    try {
      if (email === '') {
        setError('Поле "имя" не заполнено!!');
      } else if (password === '') {
        setError('Поле "пароль" не заполнено!!');
      } else {
        login({ email, password })
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
    <Flex gap="8" direction="column" className={cls.loginWrap} align="center" justify="center">
      {isLoadingLogin && <AppLoader />}
      <AppTitle titleTag="h2" title="Добро пожаловать" />
      <AppCard classNameContent={cls.loginForm}>
        <Flex gap="16" direction="column">
          <AppInput
            value={email}
            onChange={setEmail}
            type="email"
            label="Введите email:"
            placeholder="Введите свой email"
          />
          <AppInput
            value={password}
            onChange={setPassword}
            type={'password'}
            label="Введите пароль:"
            placeholder="Введите пароль"
          />
          <AppButton title="Войти" onClick={loginHandler} theme="full-bg" />
          {/*<AppButton onClick={() => loginHandler(email, password)} text="Войти" />*/}
          {error && <AppText color="red" text={error} className={cls.errorBlock} />}
        </Flex>
      </AppCard>
    </Flex>
  );
};

export default Login;
