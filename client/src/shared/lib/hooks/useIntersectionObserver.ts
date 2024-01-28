import React, { useEffect } from 'react';

export const useIntersectionObserver = (
  ref: React.MutableRefObject<HTMLDivElement | HTMLLIElement | null> | null,
  callback: () => void,
  trigger: boolean
) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      { threshold: 1 }
    );

    if (ref?.current && trigger) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref?.current && trigger) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, trigger]);
};
