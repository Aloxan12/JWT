import React, { ChangeEvent, memo } from 'react';
import cls from './AppTextarea.module.scss';
import { classNames, Mods } from '../../lib/classNames/classNames';

type TextareaRowsType = '1' | '2' | '3' | '4' | '5';

interface AppTextareaProps {
  className?: string;
  fullWidth?: boolean;
  value?: string;
  label?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  rows?: TextareaRowsType;
}

export const AppTextarea = memo(
  ({ className, value, onChange, fullWidth, rows = '2', placeholder, label }: AppTextareaProps) => {
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e.currentTarget.value);
    };

    const mods: Mods = {
      [cls.fullWidth]: fullWidth,
    };

    return (
      <div className={classNames(cls.textareaWrap, mods, [cls[`row-${rows}`], className])}>
        {label && <label>{label}</label>}
        <textarea
          value={value}
          onChange={onChangeHandler}
          className={cls.textarea}
          placeholder={placeholder}
        />
      </div>
    );
  }
);
