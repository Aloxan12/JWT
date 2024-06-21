import React, { useState } from 'react';
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
import { AppToggle } from '../../../shared/ui/AppToggle/AppToggle';

const validateRegistration = (email: string, password: string, password2: string) => {
  if (email.trim() === '') {
    return 'Поле "email" не заполнено!!';
  }

  if (password.trim().length < 4 || password2.trim().length < 4) {
    return 'Пароль должен быть заполнен и содержать не менее 4 символов!!';
  }

  if (password !== password2) {
    return 'Пароли не совпадают!!';
  }

  return null;
};

interface IFormData {
  email: string;
  password: string;
  password2: string;
}

const Registration = () => {
  const [registration, { isLoading: isLoadingRegistration }] = useRegistrationMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IFormData>({
    email: '',
    password: '',
    password2: '',
  });

  const [errorText, setErrorText] = useState('');

  const onRegistrationHandler = () => {
    const { email, password, password2 } = formData;
    const validationError = validateRegistration(email, password, password2);

    if (validationError) {
      setErrorText(validationError);
      return;
    }

    registration({ email, password, role: RoleTypes.ADMIN })
      .unwrap()
      .then(() => {
        onSuccessNotification('Письмо для подтверждения регистрации отправлено на почту', () =>
          navigate('/login')
        );
      })
      .catch((error) => {
        setErrorText('Ошибка при регистрации: ' + error.message);
      });
  };

  const onChangeHandler = (propName: keyof IFormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [propName]: value }));
    if (errorText) {
      setErrorText('');
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
            value={formData.email}
            onChange={onChangeHandler('email')}
            placeholder="Введите свой email"
            fullWidth
            type="email"
          />
          <AppInput
            label="Введите пароль:"
            value={formData.password}
            onChange={onChangeHandler('password')}
            placeholder="Введите пароль"
            fullWidth
            type="password"
          />
          <AppInput
            label="Введите еще раз пароль:"
            value={formData.password2}
            onChange={onChangeHandler('password2')}
            placeholder="Введите пароль"
            fullWidth
            type="password"
          />
          <Flex gap="16">
            <AppToggle value={false} />
            <span>Админ?</span>
          </Flex>
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
