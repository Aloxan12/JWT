import React from 'react';
import { AppDropdown, AppDropdownBase } from './AppDropdown';

interface AppMultiDropdownProps<T, TKey extends keyof T> extends AppDropdownBase<T, TKey> {
  values: T[];
  onChange: (value: T[]) => void;
}

export const AppMultiDropdown = <T, TKey extends keyof T>({
  values,
  onChange,
  propValue,
  ...otherProps
}: AppMultiDropdownProps<T, TKey>) => {
  const onChangeHandler = (value: T | null) => {
    if (!!value) {
      console.log('value', value);
      const foundItem = values.find((item) =>
        propValue ? item[propValue] === value[propValue] : item === value
      );
      if (!!foundItem) {
        const newValues = values.filter((item) =>
          propValue ? item[propValue] !== foundItem[propValue] : item !== foundItem
        );
        onChange(newValues);
      } else {
        onChange([...values, value]);
      }
    }
  };
  return (
    <AppDropdown onChange={onChangeHandler} values={values} {...otherProps} propValue={propValue} />
  );
};
