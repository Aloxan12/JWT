import React, { ChangeEvent, InputHTMLAttributes } from 'react';
import cls from './AppInput.module.scss';
import { classNames, Mods } from '../../lib/classNames/classNames';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readOnly'
>;

type InputMaskType = 'number' | 'float' | 'phone';

interface AppInputProps extends HTMLInputProps {
  value?: string | number;
  onChange?: (value: string) => void;
  className?: string;
  label?: string;
  fullWidth?: boolean;
  mask?: InputMaskType;
}

export const AppInput = ({
  className,
  fullWidth,
  label,
  value,
  onChange,
  mask,
  type = 'text',
  ...otherProps
}: AppInputProps) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let result: string;
    switch (mask) {
      case 'number':
        const integerVal = e.target.value.replace(/\D/g, '').replace(/^(0)([0-9])+/g, '$2');
        result = integerVal;
        break;
      case 'float':
        const floatVal = e.target.value
          .replace(/[,]+/g, '.')
          .replace(/^\.+/g, '')
          .replace(/^(0)([0-9])+/g, '$2')
          .match(/(^[0-9]*(\.)?[0-9]{0,2})*/g);
        result = !!floatVal ? floatVal[0] : '';
        break;
      case 'phone':
        result = e.target.value.replace(/[^\d+()]/g, '').slice(0, 15);
        break;
      default:
        result = e.target.value;
        break;
    }
    onChange?.(result);
  };

  const mods: Mods = {
    [cls.fullWidth]: fullWidth,
  };

  return (
    <div className={classNames(cls.inputWrap, mods, [className])}>
      {label && <label>{label}</label>}
      <div className={cls.inputBlock}>
        <input
          className={cls.inputBase}
          value={value}
          {...otherProps}
          onChange={onChangeHandler}
          type={type}
        />
      </div>
    </div>
  );
};
