import React, { useState } from 'react';
import { classNames, Mods } from '../../lib/classNames/classNames';
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

const hours = [
  '00',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
];

export const AppTimePicker = ({
  value,
  onChange,
  className,
  placeholder,
  label,
}: AppTimePickerProps) => {
  const [active, setActive] = useState(false);

  const onActiveHandler = () => setActive((prevState) => !prevState);

  const mods: Mods = {
    [cls.active]: active,
  };
  return (
    <div className={classNames(cls.timepickerWrap, mods, [className])} onClick={onActiveHandler}>
      <AppInput
        value={value}
        onChange={onChange}
        type="time"
        icoRight={ClockIco}
        placeholder={placeholder}
        label={label}
        className={cls.timepickerInput}
      />
      <div className={cls.timesList}>
        <div>часы</div>
        <div>минуты</div>
      </div>
    </div>
  );
};
