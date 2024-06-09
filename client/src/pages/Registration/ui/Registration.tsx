import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import cls from './Registration.module.scss';
import { useRegistrationMutation } from '../../../app/core/api/authApi';
import { useNavigate } from 'react-router-dom';
import { RoleTypes } from '../../../app/core/router/AppRouter';
import { AppLoader } from '../../../widgets/AppLoader/AppLoader';
import { onSuccessNotification } from '../../../shared/lib/onSuccessNotification';
import { AppButton } from '../../../shared/ui/AppButton/AppButton';
import { Flex } from '../../../shared/ui/Flex/Flex';
import { AppTitle } from '../../../shared/ui/AppTitle/AppTitle';
import { AppCard } from '../../../shared/ui/AppCard/AppCard';
import { AppInput } from '../../../shared/ui/AppInput/AppInput';

const Registration = () => {
  const [registration, { isLoading: isLoadingRegistration }] = useRegistrationMutation();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errorText, setErrorText] = useState('');

  const onRegistrationHandler = () => {
    if (email.trim() === '') {
      setErrorText('Поле "email" не заполнено!!');
    } else if (password.trim().length < 4 && password2.trim().length < 4) {
      setErrorText('Поле пароль должно быть заполнено и быть длинее 4 символов!!');
    } else if (password !== password2) {
      setErrorText('Разные пароли!!');
    } else {
      registration({ email, password, role: RoleTypes.ADMIN })
        .unwrap()
        .then(
          onSuccessNotification('Писльмо для подтверждаения регистрации отправлено на почту', () =>
            navigate('/login')
          )
        );
    }
  };

  return (
    <Flex gap="8" direction="column" className={cls.authWrap} align="center" justify="center">
      {isLoadingRegistration && <AppLoader />}
      <AppTitle titleTag="h2" title="Регистрация" />
      <AppCard className={cls.registrationBlock} classNameContent={cls.content}>
        <Flex gap="16" direction="column">
          <AppInput
            label="Введите email:"
            value={email}
            onChange={(value) => {
              setErrorText('');
              setEmail(value);
            }}
            placeholder="Введите свой email"
            fullWidth
          />
          <AppInput
            label="Введите пароль:"
            value={email}
            onChange={(value) => {
              setErrorText('');
              setPassword(value);
            }}
            placeholder="Введите пароль"
            fullWidth
            type="password"
            name="password"
          />
          <AppInput
            label="Введите еще раз пароль:"
            value={email}
            onChange={(value) => {
              setErrorText('');
              setPassword2(value);
            }}
            placeholder="Введите пароль"
            fullWidth
            type="password"
            name="password2"
          />
          <AppButton
            text="Зарегистрироваться"
            max
            theme="full-bg"
            onClick={onRegistrationHandler}
          />
          <AppButton text="Войти" to="/" max theme="clear" />
          {errorText && <div className="error-text">{errorText}</div>}
        </Flex>
      </AppCard>
    </Flex>
  );
};

export default Registration;
