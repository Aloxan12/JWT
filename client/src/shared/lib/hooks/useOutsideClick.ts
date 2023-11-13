import { RefObject, useCallback, useEffect } from 'react';

export const useOutsideClick = (
  callback: () => void,
  ref: RefObject<HTMLDivElement>,
  extraRef?: RefObject<HTMLDivElement>
) => {
  const outSideClickHandler = useCallback(
    (e) => {
      e.stopPropagation();
      if (extraRef?.current) {
        if (
          ref.current &&
          !ref.current.contains(e.target) &&
          !extraRef.current.contains(e.target)
        ) {
          callback();
        }
      } else {
        if (ref.current && !ref.current.contains(e.target)) {
          callback();
        }
      }
    },
    [callback, extraRef, ref]
  );

  useEffect(() => {
    if (ref) {
      document.addEventListener('mousedown', outSideClickHandler, false);
    }
    return () => {
      if (ref) {
        document.removeEventListener('mousedown', outSideClickHandler, false);
      }
    };
  }, [outSideClickHandler, ref, extraRef]);
};
