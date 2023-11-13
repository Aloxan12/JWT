import React, { RefObject, useEffect } from 'react';

export interface PositionData {
  top: number;
  bottom: number;
  right: number;
  left: number;
  height?: number;
  width?: number;
}

export const useGetPosition = (
  trigger: boolean,
  ref: RefObject<HTMLDivElement>,
  setPosition: React.Dispatch<React.SetStateAction<PositionData>>
) => {
  const getPosition = () => {
    if (ref.current) {
      const { left, top, bottom, right, height, width } = ref.current.getBoundingClientRect();
      setPosition({ left, top, bottom, right, height, width });
    }
  };

  useEffect(() => {
    if (trigger) {
      getPosition();
      window.addEventListener('resize', getPosition, false);
    }
    return () => {
      if (trigger) {
        window.removeEventListener('resize', getPosition, false);
      }
    };
  }, [trigger]);
};
