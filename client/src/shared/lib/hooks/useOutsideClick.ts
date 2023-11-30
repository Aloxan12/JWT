import { RefObject, useCallback, useEffect } from 'react';

export const useOutsideClick = (
  callback: () => void,
  ref: RefObject<HTMLDivElement>,
  triggerRef?: RefObject<HTMLDivElement>,
  active: boolean = true
) => {
  const outSideClickHandler = useCallback(
    (e) => {
      e.stopPropagation();
      if (ref.current) {
        const ignoreElements = [ref.current];

        if (triggerRef?.current) {
          ignoreElements.push(triggerRef?.current);
        }

        console.log('triggerRef', triggerRef);
        if (!ignoreElements.some((ref) => !ref.contains(e.target))) {
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
