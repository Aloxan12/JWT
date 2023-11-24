import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AppInput } from '../../shared/ui/AppInput/AppInput';
import { useSearchParams } from 'react-router-dom';

interface AppInputFilter {
  searchParam: string;
  label?: string;
  placeholder?: string;
  fullWidth?: boolean;
}

export const AppInputFilter = ({ searchParam, label, placeholder, fullWidth }: AppInputFilter) => {
  const isInitialMount = useRef(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get(searchParam) || '');

  const onChangeHandler = useCallback(() => {
    const isParameterEntry = !!searchParams.get(searchParam);
    if (!isParameterEntry && !!value) {
      searchParams.append(searchParam, value);
    } else if (!!value) {
      searchParams.set(searchParam, value);
    } else if (!value) {
      searchParams.delete(searchParam);
    }
    setSearchParams(searchParams.toString());
  }, [searchParam, searchParams, value]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      const handler = setTimeout(() => {
        onChangeHandler();
      }, 500);
      return () => {
        clearTimeout(handler);
      };
    }
  }, [onChangeHandler]);

  return (
    <AppInput
      value={value}
      onChange={setValue}
      label={label}
      placeholder={placeholder}
      fullWidth={fullWidth}
    />
  );
};
