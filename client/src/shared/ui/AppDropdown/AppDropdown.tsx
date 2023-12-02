import React, { useRef, useState, MouseEvent } from 'react';
import cls from './AppDropdown.module.scss';
import { AppInput } from '../AppInput/AppInput';
import { classNames, Mods } from '../../lib/classNames/classNames';
import { ReactComponent as ArrowIco } from '../../../utils/images/icons/arrow-down.svg';
import { useOutsideClick } from '../../lib/hooks/useOutsideClick';

export interface AppDropdownBase<T, TKey extends keyof T> {
  className?: string;
  data: T[];
  propName?: TKey;
  propValue?: TKey;
  label?: string;
  placeholder?: string;
  error?: string;
  message?: string;
  fullWidth?: string;
  disabled?: boolean;

  search?: string;
  searchFn?: (value: string) => void;
}

interface AppDropdownOneProps<T, TKey extends keyof T> extends AppDropdownBase<T, TKey> {
  value?: T | null;
  onChange: (value: T | null) => void;
  values?: never;
}
interface AppDropdownMultiProps<T, TKey extends keyof T> extends AppDropdownBase<T, TKey> {
  values?: T[];
  onChange: (value: T | null) => void;
  value?: never;
}

type AppDropdownProps<T, TKey extends keyof T> =
  | AppDropdownOneProps<T, TKey>
  | AppDropdownMultiProps<T, TKey>;

export const AppDropdown = <T, TKey extends keyof T>({
  className,
  data,
  value,
  values,
  propName,
  propValue,
  label,
  message,
  placeholder,
  error,
  fullWidth,
  search,
  searchFn,
  disabled,
  onChange,
}: AppDropdownProps<T, TKey>) => {
  const dropdownWrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const mods: Mods = {
    [cls.activeDropdown]: active,
    [cls.searchFn]: !!searchFn,
    [cls.fullWidth]: !!fullWidth,
  };

  const onDropdown = () => setActive((prev) => !prev);
  const closeDropdown = () => setActive(false);

  useOutsideClick(closeDropdown, dropdownWrapRef);

  const changeHandler = (e: MouseEvent<HTMLLIElement>, value: T | null) => {
    e.stopPropagation();
    onChange?.(value);
    setActive(false);
  };

  const valueShow = !values
    ? !!searchFn && active
      ? search
      : !!value
      ? propName
        ? value[propName]
        : value
      : ''
    : '';
  return (
    <div
      className={classNames(cls.dropdownWrap, mods, [className])}
      ref={dropdownWrapRef}
      onClick={onDropdown}
    >
      <AppInput
        value={`${valueShow}`}
        label={label}
        placeholder={placeholder}
        message={message}
        error={error}
        fullWidth={!!fullWidth}
        icoRight={ArrowIco}
        className={cls.inputDropdown}
        disabled={disabled}
      />
      <ul className={cls.dropdownItems} onChange={(e) => e.preventDefault()}>
        {data.map((item) => {
          const itemValue = `${propValue ? item[propValue] : item}`;
          const currentValue = `${value ? (propValue ? value[propValue] : value) : ''}`;
          const itemName = `${propName ? item[propName] : item}`;
          return (
            <li
              className={classNames(cls.dropdownItem, {
                [cls.active]: currentValue === itemValue,
              })}
              key={itemValue}
              onClick={(e) => changeHandler(e, item)}
            >
              {itemName}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
