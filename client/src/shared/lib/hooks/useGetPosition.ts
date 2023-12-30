import React, { useCallback, useEffect, useState } from 'react';

export interface PositionData {
  left: number;
  top: number;
  width: number;
  height?: number;
  bottom: number;
}

export const useGetPosition = (
  ref: React.MutableRefObject<HTMLDivElement | null> | null,
  active: boolean
): PositionData => {
  const [position, setPosition] = useState({ left: 0, top: 0, width: 0, bottom: 0, height: 0 });

  const getPosition = useCallback(() => {
    if (ref?.current) {
      const { left, top, bottom, width, height } = ref.current.getBoundingClientRect();
      setPosition({ left, top, bottom, width, height });
    }
  }, [ref]);

  useEffect(() => {
    if (active) {
      getPosition();
      window.addEventListener('resize', getPosition, false);
      window.addEventListener('scroll', getPosition, false);
    }
    return () => {
      if (active) {
        window.removeEventListener('resize', getPosition, false);
        window.removeEventListener('scroll', getPosition, false);
      }
    };
  }, [active, getPosition]);

  return position;
};
