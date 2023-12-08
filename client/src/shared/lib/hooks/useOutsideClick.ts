import { RefObject, useCallback, useEffect } from 'react';

export const useOutsideClick = (
  callback: () => void,
  ref: RefObject<HTMLDivElement>,
  active: boolean = true,
  triggerRef?: RefObject<HTMLDivElement>
) => {
  const outSideClickHandler = useCallback(
    (e) => {
      if (ref.current) {
        const ignoreElements = [ref.current];
        if (triggerRef?.current) {
          ignoreElements.push(triggerRef.current);
        }

        if (!ignoreElements.some((el) => el.contains(e.target))) {
          callback();
        }
      }
    },
    [callback, triggerRef, ref]
  );

  useEffect(() => {
    if (active) {
      document.addEventListener('mousedown', outSideClickHandler, false);
    }
    return () => {
      if (active) {
        document.removeEventListener('mousedown', outSideClickHandler, false);
      }
    };
  }, [outSideClickHandler, ref, triggerRef, active]);
};
