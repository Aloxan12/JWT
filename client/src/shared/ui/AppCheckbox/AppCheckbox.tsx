import React, { memo } from 'react';
import cls from './AppCheckbox.module.scss';
import { classNames } from '../../lib/classNames/classNames';

interface AppCheckboxProps {
  id: string;
  className?: string;
  value: boolean;
  onChange?: (value: boolean) => void;
  text?: string;
  disabled?: boolean;
}

export const AppCheckbox = memo(
  ({ id, value, onChange, text, disabled, className }: AppCheckboxProps) => {
    const onChangeHandler = () => onChange?.(!value);

    return (
      <div className={classNames(cls.checkboxWrapper, {}, [className])}>
        <input
          type={id}
          className={cls.input}
          checked={value}
          onChange={onChangeHandler}
          id={id}
          disabled={disabled}
        />
        <label htmlFor={id}>{text}</label>
      </div>
    );
  }
);
