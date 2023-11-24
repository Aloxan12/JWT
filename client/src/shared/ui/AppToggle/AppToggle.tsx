import React, { ChangeEvent, memo } from 'react';
import cls from './AppToggle.module.scss';
import { classNames, Mods } from '../../lib/classNames/classNames';

interface IAppToggle {
  value: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}

export const AppToggle = memo(({ value, onChange, disabled }: IAppToggle) => {
  const onChangeHandler = !!onChange
    ? (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.checked);
      }
    : undefined;
  const mods: Mods = {
    [cls.activeNot]: !onChange,
  };
  return (
    <label className={cls.checkboxSlider}>
      <input
        type="checkbox"
        className={cls.checkbox}
        id="input-p-slider"
        checked={value}
        onChange={onChangeHandler}
        disabled={disabled}
      />
      <span className={classNames(cls.slider, mods, [])} />
    </label>
  );
});
