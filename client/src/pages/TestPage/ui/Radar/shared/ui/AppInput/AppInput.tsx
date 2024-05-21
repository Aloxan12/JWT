import React, { ChangeEvent, InputHTMLAttributes, useRef } from 'react';
import cls from './AppInput.module.scss';
import { ReactComponent } from '*.svg';
import { inputMaskFn } from './helpers/inputMaskFn';
import { classNames, Mods } from '../../../../../../../shared/lib/classNames/classNames';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readOnly'
>;

export type InputMaskType = 'float' | 'integer' | 'negativeInteger';

export interface AppInputCommonProps extends HTMLInputProps {
  className?: string;
  label?: string | undefined;
  error?: string | undefined;
  message?: string;
  id?: string;
  minValue?: string;
  maxValue?: string;
  fullWidth?: boolean;
  showCaption?: boolean;
}

interface AppInputProps extends AppInputCommonProps {
  classNameInput?: string;
  value?: string | undefined;
  onChange?: (value: string) => void | undefined;
  inDropdown?: boolean;
  isActiveDropdown?: boolean;
  icoLeft?: typeof ReactComponent;
  icoRight?: typeof ReactComponent | string;
  icoRightOnClick?: () => void;
  mask?: InputMaskType;
  autoFocus?: boolean;
}

export const AppInput = ({
  className,
  classNameInput,
  fullWidth,
  value,
  label,
  onChange,
  icoRight,
  icoLeft,
  error,
  disabled,
  inDropdown,
  message,
  type,
  id,
  onBlur,
  mask,
  icoRightOnClick,
  autoFocus,
  required,
  maxLength,
  placeholder,
  showCaption,
  isActiveDropdown,
  ...otherProps
}: AppInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (type === 'date') {
      if (e.target.value.length > 10) {
        return;
      }
      // const value = dayjs(e.target.value).toISOString()
      // onChange?.(value ? value : '')
      return;
    }
    if (mask) {
      onChange?.(inputMaskFn(e.target.value, mask));
      return;
    }
    onChange?.(e.currentTarget.value);
  };

  const mods: Mods = {
    [cls.fullWidth]: fullWidth,
    [cls.error]: !!error,
    [cls.disabled]: disabled,
    [cls.inDropdown]: inDropdown,
    [cls.timepicker]: type === 'time' || type === 'date',
  };

  const modsInput: Mods = {
    [cls.showCaption]: showCaption,
    [cls.icoPaddingLeft]: !!icoLeft,
    [cls.icoPaddingRight]: !!icoRight,
  };

  return (
    <div className={classNames(cls.inputWrap, mods, [className])}>
      {label && (
        <label className={cls.label}>
          {label} {required && <span className={cls.required}>*</span>}
        </label>
      )}
      <div className={cls.inputBlock}>
        {icoRight && (
          <span className={`${cls.icoRight}${icoRightOnClick ? ' ' + cls.point : ''}`}>^</span>
          // <AppIco
          //   ico={icoRight}
          //   className={`${cls.icoRight}${icoRightOnClick ? ' ' + cls.point : ''}`}
          //   onClick={icoRightOnClick}
          // />
        )}

        <input
          value={value}
          onChange={onChangeHandler}
          {...otherProps}
          className={classNames(cls.inputBase, modsInput, [classNameInput])}
          id={id}
          type={type}
          autoFocus={autoFocus}
          maxLength={maxLength ? maxLength : mask === 'float' ? 15 : 300}
          placeholder={!showCaption ? placeholder : undefined}
          ref={inputRef}
          disabled={disabled}
        />
        {showCaption && placeholder && (
          <div
            onClick={() => (!disabled ? inputRef?.current?.focus() : undefined)}
            className={classNames(
              cls.showCaptionBlock,
              { [cls.withValue]: !!value || !!isActiveDropdown },
              []
            )}
          >
            {placeholder}
          </div>
        )}
        {error && <div className={cls.errorText}>{error}</div>}
        {message && !error && <div className={cls.messageText}>{message}</div>}
      </div>
    </div>
  );
};
