import React, { useEffect, useRef, useState } from 'react';
import styles from './AppDropdown.module.css';
import { AppInput } from '../AppInput/AppInput';

interface IAppDropdownBase<T, TKey extends keyof T> {
  disabled?: boolean;
  error?: string;
  placeholder?: string;
  data: T[];
  value: T | null;
  onChange: (value: T) => void;
  propToShowInList?: TKey; // если data массив строк, то не передаем propToShowInList и propToShowInInput
  propToShowInInput?: TKey;
  resetValueHandler?: () => void;
  paginationMode?: boolean;
  inputSearchFn?: (value: string) => void;
}

type AppDropdownType<T, TKey extends keyof T> = IAppDropdownBase<T, TKey>;

export const AppDropdown = <T, TKey extends keyof T>({
  data,
  disabled = false,
  resetValueHandler,
  error,
  placeholder,
  propToShowInList,
  propToShowInInput,
  onChange,
  value,
  paginationMode = false,
  inputSearchFn,
}: AppDropdownType<T, TKey>) => {
  const [active, setActive] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<T[] | []>([]);

  const refDropDown = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentData(data);
  }, [data]);

  const outSideClickHandler = (e: any) => {
    e.stopPropagation();
    if (refDropDown.current && !refDropDown.current.contains(e.target)) {
      setActive(false);
    }
  };

  useEffect(() => {
    if (active) {
      document.addEventListener('click', outSideClickHandler, false);
      document.addEventListener('touchend', outSideClickHandler, false);
    }
    return () => {
      if (active) {
        document.removeEventListener('click', outSideClickHandler, false);
        document.removeEventListener('touchend', outSideClickHandler, false);
      }
    };
  }, [active]);
  const onChangeHandler = (item: T | null) => {
    if (item) {
      onChange(item);
    } else if (resetValueHandler) {
      resetValueHandler();
    }
    setActive(false);
  };

  const inputValue = !!value
    ? propToShowInInput
      ? `${value[propToShowInInput]}`
      : propToShowInList
      ? `${value[propToShowInList]}`
      : `${value}`
    : null;

  return (
    <div
      className={`${styles.AppDropdown} ${active ? styles.Active : ''} ${
        paginationMode ? styles.PaginationMode : ''
      }`}
      ref={refDropDown}
    >
      <AppInput
        onClick={() => (disabled ? false : setActive((prev) => !prev))}
        onChange={(value) => {
          if (!active) {
            setActive(true);
          }
          return inputSearchFn ? inputSearchFn(value) : false;
        }}
        value={inputValue}
        dropdownInput
        error={error}
        placeholder={placeholder}
        dropdownActive={active}
      />
      {active && !!currentData && (
        <div className={styles.DropdownValuesBlock}>
          {!!resetValueHandler && (
            <div
              className={`${styles.ValueItem} ${styles.ResetFilter}`}
              onClick={() => onChangeHandler(null)}
            >
              Очистить фильтр
            </div>
          )}
          {currentData.map((item, index) => {
            const itemValue = propToShowInList ? item[propToShowInList] : item;
            return (
              <div
                onClick={() => onChangeHandler(item)}
                className={`${styles.ValueItem}`}
                key={`dropdown-active${index}`}
              >
                {itemValue}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
