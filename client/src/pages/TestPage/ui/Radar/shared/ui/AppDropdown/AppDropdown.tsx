import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useOutsideClick } from '../../../../../../../shared/lib/hooks/useOutsideClick';
import { classNames, Mods } from '../../../../../../../shared/lib/classNames/classNames';
import cls from './AppDropdown.module.scss';
import { paginationHelper } from './helpers/paginationHelper';
import { AppInput } from '../AppInput/AppInput';
import { onStopPropagationHandler } from '../../../../../../../shared/lib/onStopPropagationHandler';
import { AppCheckbox } from '../../../../../../../shared/ui/AppCheckbox/AppCheckbox';
import { AppButton } from '../../../../../../../shared/ui/AppButton/AppButton';

export interface IBaseResponseDto {
  count: number;
  next: string;
  previous: string;
}

export interface IBaseRequestDto {
  offset?: number;
  limit?: number;
}

export interface IWithPaginationRequestSearch extends IBaseRequestDto {
  search?: string;
}

interface MultiValueObjProps {
  [key: string]: boolean;
}

export interface AppDropdownCommonProps {
  className?: string;
  label?: string;
  error?: string;
  placeholder?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  inputSearch?: string;
  inputSearchFn?: (value: string) => void;
  id?: string;
  message?: string;
  required?: boolean;
  showCaption?: boolean;
}

interface AppDropdownBase<T, TKey extends keyof T> extends AppDropdownCommonProps {
  multiValue?: T[];
  value: T | null;
  propName?: TKey;
  propValue?: TKey;
  representFn?: (item: T | null) => string;
  onChange: (value: T) => void;
}

interface IAppDropdown<T, TKey extends keyof T> extends AppDropdownBase<T, TKey> {
  data: T[]; // data - может быть объектом с ключами, в этом случае мы можем передать propToShowInList и propToShowInInput
  loadMoreCallBack?: never;
  resetData?: never;
  setResetData?: never;
  isLoading?: never;
}

interface IData<T> extends IBaseResponseDto {
  results: T[];
}

interface IAppDropdownWithPagination<T, TKey extends keyof T> extends AppDropdownBase<T, TKey> {
  loadMoreCallBack: (newPageParams: IWithPaginationRequestSearch) => void;
  resetData?: boolean;
  isLoading?: boolean;
  setResetData?: (value: boolean) => void;
  data: IData<T>;
}

type AppDropdownType<T, TKey extends keyof T> =
  | IAppDropdown<T, TKey>
  | IAppDropdownWithPagination<T, TKey>;

export const AppDropdown = <T, TKey extends keyof T>({
  value,
  multiValue,
  propValue,
  propName,
  onChange,
  label,
  placeholder,
  inputSearch,
  inputSearchFn,
  error,
  disabled,
  fullWidth,
  className,
  loadMoreCallBack,
  data,
  id,
  required,
  isLoading,
  resetData,
  setResetData,
  representFn,
  message,
  showCaption,
}: AppDropdownType<T, TKey>) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dropdownValueRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);
  const [currentData, setCurrentData] = useState<T[] | []>([]);
  const [isLoadMore, setIsLoadMore] = useState(false);

  const multiValueObj: MultiValueObjProps | undefined = useMemo(
    () =>
      multiValue?.reduce((obj, el) => {
        const key = propValue ? el[propValue] : el;
        return { ...obj, [`${key}`]: true };
      }, {}),
    [multiValue, propValue]
  );

  const onDropdown = useCallback(() => setActive((prevState) => !prevState), []);

  const closeDropdown = useCallback(() => {
    setActive(false);
    inputSearchFn?.('');
  }, [inputSearchFn]);

  const onChangeHandler = (item: T | null) => () => {
    if (item) {
      onChange(item);
    }
    setActive(!!multiValue);
    if (!multiValue) {
      inputSearchFn?.('');
    }
  };

  useEffect(() => {
    if (!loadMoreCallBack) {
      setCurrentData(data);
    }
    if (isLoadMore && loadMoreCallBack && !!data) {
      setCurrentData((prev) => {
        return [...prev, ...data.results];
      });
      setIsLoadMore(false);
    } else if (loadMoreCallBack && !!data) {
      setCurrentData(data.results);
    }
    if (resetData && !!setResetData) {
      setResetData(false);
    }
    // eslint-disable-next-line
  }, [data]);

  useOutsideClick(closeDropdown, dropdownRef, active);

  const mods: Mods = {
    [cls.disabled]: disabled,
    [cls.active]: active,
    [cls.error]: error && !active,
    [cls.fullWidth]: fullWidth,
  };

  const nextPageParams = loadMoreCallBack ? paginationHelper({ next: data?.next }) : {};

  const nextPageHandler = () => {
    if (loadMoreCallBack) {
      loadMoreCallBack(nextPageParams);
      setIsLoadMore(true);
    }
  };

  const inputValue = representFn
    ? representFn(value)
    : value
    ? propName
      ? `${value[propName]}`
      : propValue
      ? `${value[propValue]}`
      : `${value}`
    : '';

  return (
    <div
      className={classNames(cls.appDropdownWrap, mods, [className])}
      ref={dropdownRef}
      onClick={onDropdown}
    >
      <AppInput
        value={active ? inputSearch : inputValue}
        onChange={inputSearchFn}
        icoRight="ico"
        label={label}
        placeholder={placeholder}
        error={error}
        fullWidth={!!fullWidth}
        className={cls.input}
        inDropdown={inputSearch === undefined || active}
        required={required}
        message={message}
        id={id}
        showCaption={showCaption}
      />
      {active && (
        <div
          className={classNames(cls.dropdownValuesBlock, { [cls.withLabel]: !!label }, [])}
          onClick={onStopPropagationHandler}
          ref={dropdownValueRef}
        >
          {Boolean(currentData?.length) &&
            currentData.map((item) => {
              const valueV = `${value ? (propValue ? value[propValue] : value) : ''}`;
              const multiValueActive = Boolean(
                multiValueObj ? multiValueObj[`${propValue ? item[propValue] : item}`] : false
              );
              const itemName = representFn
                ? representFn(item)
                : `${propName ? item[propName] : item}`;
              const itemValue = `${propValue ? item[propValue] : item}`;
              return (
                <div
                  className={classNames(cls.dropdownItem, { [cls.active]: valueV === itemValue })}
                  key={itemValue}
                  onClick={onChangeHandler(item)}
                >
                  {!!multiValueObj && (
                    <AppCheckbox
                      value={multiValueActive}
                      id={itemValue}
                      disabled
                      className={cls.checkbox}
                    />
                  )}
                  {itemName}
                </div>
              );
            })}
          {!currentData.length && <div className={cls.emptyList}>Пусто</div>}
          {!isLoading && loadMoreCallBack && data.next && (
            <AppButton
              text="Показать еще"
              onClick={nextPageHandler}
              isLoading={isLoading}
              max
              // size="s"
            />
          )}
        </div>
      )}
    </div>
  );
};
