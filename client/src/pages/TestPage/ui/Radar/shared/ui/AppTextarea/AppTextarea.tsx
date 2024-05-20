import React from 'react';
import cls from './AppTextarea.module.scss';
import { ChangeEvent, useRef, useState } from 'react';
import { classNames, Mods } from '../../../../../../../shared/lib/classNames/classNames';

type AppTextareaRowsType = '1' | '2' | '3' | '4' | '5' | 'full';

interface AppTextareaProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  rows?: AppTextareaRowsType;
  fullWidth?: boolean;
  disabled?: boolean;
  error?: string;
  message?: string;
  maxLength?: number;
}

export const AppTextarea = ({
  className,
  value,
  rows = '1',
  fullWidth,
  label,
  placeholder,
  onChange,
  error,
  disabled,
  maxLength,
  message,
}: AppTextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [textareaHeight, setTextareaHeight] = useState('100%');

  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (!disabled) {
      onChange?.(e.currentTarget.value);
      setTextareaHeight(`${e.target.scrollHeight}px`);
    }
  };
  const onTextareaBlock = () => {
    textareaRef.current?.focus();
  };
  const mods: Mods = {
    [cls.fullWidth]: fullWidth,
    [cls.disabled]: disabled,
    [cls.error]: error,
  };
  return (
    <div className={classNames(cls.textareaWrap, mods, [className])}>
      {label && <label>{label}</label>}
      <div
        className={classNames(cls.textareaBlock, {}, [cls[`row-${rows}`]])}
        onClick={onTextareaBlock}
      >
        <textarea
          style={{ height: textareaHeight }}
          value={value}
          onChange={onChangeHandler}
          placeholder={placeholder}
          ref={textareaRef}
          disabled={disabled}
          maxLength={maxLength}
        />
        {error && <div className={cls.errorBlock}>{error}</div>}
        {message && <div className={cls.messageBlock}>{message}</div>}
      </div>
    </div>
  );
};
