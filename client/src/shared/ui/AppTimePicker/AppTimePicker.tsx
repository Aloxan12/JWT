import React, { useMemo, useState } from 'react';
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

const hoursArray = Array.from({ length: 24 }, (_, index) => String(index).padStart(2, '0'));
const minutesArray = Array.from({ length: 60 }, (_, index) => String(index).padStart(2, '0'));

export const AppTimePicker = ({
  value,
  onChange,
  className,
  placeholder,
  label,
}: AppTimePickerProps) => {
  const [active, setActive] = useState(false);
  const [hour, min] = useMemo(() => (value ? value.split(':') : ['', '']), [value]);
  const onActiveHandler = () => setActive((prevState) => !prevState);

  const mods: Mods = {
    [cls.active]: active,
  };

  const onChangeHandler = (type: 'h' | 'min', valueItem: string) => () => {
    let newTime: string = '';
    if (type === 'h') {
      newTime = `${valueItem}:${min || '00'}`;
    }
    if (type === 'min') {
      newTime = `${hour || '00'}:${valueItem}`;
    }
    onChange?.(newTime);
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
      <div className={cls.timesListWrap}>
        <div className={cls.timesList}>
          {hoursArray.map((item) => (
            <div
              key={`hour-${item}`}
              className={classNames(cls.item, { [cls.active]: hour === item })}
              onClick={onChangeHandler('h', item)}
            >
              {item}
            </div>
          ))}
        </div>
        <div className={cls.timesList}>
          {minutesArray.map((item) => (
            <div
              key={`hour-${item}`}
              className={classNames(cls.item, { [cls.active]: min === item })}
              onClick={onChangeHandler('min', item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
