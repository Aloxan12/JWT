import React, { memo } from 'react';
import cls from './AppCheckbox.module.scss';

interface AppCheckboxProps {
  id: string;
  value: boolean;
  onChange: (value: boolean) => void;
  text?: string;
}

export const AppCheckbox = memo(({ id, value, onChange, text }: AppCheckboxProps) => {
  const onChangeHandler = () => onChange(!value);

  return (
    <div className={cls.checkboxWrapper}>
      <input type={id} className={cls.input} checked={value} onChange={onChangeHandler} id={id} />
      <label htmlFor={id}>{text}</label>
    </div>
  );
});
