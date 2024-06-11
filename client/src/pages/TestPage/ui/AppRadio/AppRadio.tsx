import React from 'react';
import cls from './AppRadio.module.scss';
import { classNames, Mods } from '../../../../shared/lib/classNames/classNames';

interface AppRadioProps {
  isActive: boolean;
  onClick: () => void;
  text?: string;
  disabled?: boolean;
}

export const AppRadio = ({ isActive, onClick, disabled, text }: AppRadioProps) => {
  const mods: Mods = {
    [cls.active]: isActive,
    [cls.disabled]: disabled,
  };

  return (
    <div className={cls.radioWrap}>
      <div className={classNames(cls.radio, mods, [])}>
        {isActive && <div className={cls.white} />}
      </div>
      {text && <span>{text}</span>}
    </div>
  );
};
