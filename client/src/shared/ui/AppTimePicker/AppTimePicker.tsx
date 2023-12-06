import React from 'react';
import { classNames } from '../../lib/classNames/classNames';
import cls from './AppTimePicker.module.scss';
import { AppInput } from '../AppInput/AppInput';
import { ReactComponent as ClockIco } from '../../../utils/images/icons/watch.svg';

interface AppTimePickerProps {
  className?: string;
  value?: string;
  label?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export const AppTimePicker = ({
  value,
  onChange,
  className,
  placeholder,
  label,
}: AppTimePickerProps) => {
  return (
    <div className={classNames(cls.timepickerWrap, {}, [className])}>
      <AppInput
        value={value}
        onChange={onChange}
        type="time"
        icoRight={ClockIco}
        placeholder={placeholder}
        label={label}
        className={cls.timepickerInput}
      />
    </div>
  );
};
