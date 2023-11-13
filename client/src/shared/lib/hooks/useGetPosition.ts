import React, { RefObject, useEffect } from 'react';

export interface PositionData {
  top: number;
  bottom: number;
  right: number;
  left: number;
}

export const useGetPosition = (
  trigger: boolean,
  ref: RefObject<HTMLDivElement>,
  setPosition: React.Dispatch<React.SetStateAction<PositionData>>
) => {
  const getPosition = () => {
    if (ref.current) {
      const { left, top, bottom, right } = ref.current.getBoundingClientRect();
      setPosition({ left, top, bottom, right });
    }
  };

  useEffect(() => {
    if (trigger) {
      getPosition();
    }
  }, [trigger]);
};
