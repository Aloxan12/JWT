import React, { ChangeEvent, InputHTMLAttributes } from 'react';
import cls from './AppInput.module.scss';
import { classNames } from '../../lib/classNames/classNames';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readOnly'
>;

interface AppInputProps extends HTMLInputProps {
  value?: string | number;
  onChange?: (value: string) => void;
  className?: string;
  label?: string;
}

export const AppInput = ({ className, label, value, onChange, ...otherProps }: AppInputProps) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let result: string = e.target.value;

    onChange?.(result);
  };

  return (
    <div className={classNames(cls.inputWrap, {}, [className])}>
      {label && <label>{label}</label>}
      <div className={cls.inputBlock}>
        <input className={cls.inputBase} value={value} {...otherProps} onChange={onChangeHandler} />
      </div>
    </div>
  );
};
