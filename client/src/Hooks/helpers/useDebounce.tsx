import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
}

export function throttle<T>(callback: T, delay: number) {
  let isWaiting = false;
  let savedArgs: any[] | null = null;
  let savedThis: null | any = null;
  return function wrapper(this: any, ...args: any) {
    if (isWaiting) {
      savedArgs = args;
      savedThis = this;
      return;
    }
    // @ts-ignorer
    callback.apply(this, args);
    isWaiting = true;
    setTimeout(() => {
      isWaiting = false;
      if (savedThis) {
        wrapper.apply(savedThis, savedArgs!);
        savedThis = null;
        savedArgs = args;
      }
    }, delay);
  };
}
