import React, { ChangeEvent, useMemo } from 'react';
import './AppInput.scss';
import icoRightPhoto from '../../../utils/images/arrow-down.png';

export enum IcoType {
  ico_right = 'ico-right',
}

export enum InputMaskType {
  float,
  integer,
  negativeInteger,
}

interface IAppInputBase {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string | null;
  onChange: (value: string) => void;
  message?: string | null;
  error?: string | null;
  inputMask?: InputMaskType;
  disabled?: boolean;
  keyDirectionFn?: null | ((value: React.KeyboardEvent<HTMLInputElement>) => void); // использует исключительно для определения нажатия вверх или вниз на клавиатуре
}

interface IAppInputTextarea extends IAppInputBase {
  icoRight?: never;
  rows: number;
  onClick?: never;
  dropdownInput?: never;
  dropdownActive?: never;
}

interface IAppInputIcoRight extends IAppInputBase {
  icoRight?: IcoType;
  rows?: never;
  onClick?: never;
  dropdownInput?: never;
  dropdownActive?: never;
}

interface IAppInputDropdown extends IAppInputBase {
  icoRight?: never;
  rows?: never;
  onClick: () => void;
  dropdownInput: boolean;
  dropdownActive: boolean;
}

type AppInputType = IAppInputTextarea | IAppInputIcoRight | IAppInputDropdown;

export const AppInput = ({
  label,
  type = 'text',
  value,
  onChange,
  onClick,
  dropdownInput,
  dropdownActive,
  error,
  placeholder,
  icoRight,
  inputMask,
  disabled = false,
  keyDirectionFn = null,
  message,
}: AppInputType) => {
  const wrapperProps = onClick ? { onClick } : {};

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let result = '';
    switch (inputMask) {
      case InputMaskType.integer:
        const integerVal = e.currentTarget.value.replace(/\D/g, '').replace(/^(0)([0-9])+/g, '$2');
        result = integerVal;
        break;
      case InputMaskType.negativeInteger:
        const factor = e.target.value.length > 1 && e.target.value[0] === '-' ? -1 : 1;
        const isOnlyMinus = e.target.value === '-';
        const integerNegative = e.target.value.replace(/\D/g, '').replace(/^(0)([0-9])+/g, '$2');
        result = isOnlyMinus ? '-' : !!integerNegative ? `${Number(integerNegative) * factor}` : '';
        break;
      default:
        result = e.currentTarget.value;
    }
    return onChange(result);
  };

  const keyDownPropsWrapper = useMemo(() => {
    return keyDirectionFn
      ? {
          onKeyDown: keyDirectionFn,
        }
      : {};
  }, [keyDirectionFn]);

  return (
    <div className={'app-input-wrap'} {...wrapperProps}>
      {label && <label>{label}</label>}
      <div className={`app-input ${error ? 'border-error' : ''} ${dropdownActive ? 'active' : ''}`}>
        {(!!icoRight && icoRight === IcoType.ico_right) ||
          (!!dropdownInput && (
            <img
              src={icoRightPhoto}
              alt="arrow-down"
              className={`ico-right ${dropdownActive ? 'active' : ''}`}
            />
          ))}
        {type === 'textarea' ? (
          <textarea
            value={!!value ? value : ''}
            placeholder={placeholder}
            onChange={onChangeHandler}
            disabled={disabled}
            className={'app-textarea-input-base'}
          />
        ) : (
          <input
            value={!!value ? value : ''}
            placeholder={placeholder}
            onChange={onChangeHandler}
            {...keyDownPropsWrapper}
            disabled={disabled}
            type={type}
            className={'app-input-base'}
          />
        )}
      </div>
      {error && <div className={'app-input-error'}>{error}</div>}
      {message && !error && <div className={'app-input-message'}>{message}</div>}
    </div>
  );
};
