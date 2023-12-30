import React, { ReactNode, useRef, useState } from 'react';
import cls from './AppPopover.module.scss';
import { classNames, Mods } from '../../lib/classNames/classNames';
import { useOutsideClick } from '../../lib/hooks/useOutsideClick';
import { useGetPosition, PositionData } from '../../lib/hooks/useGetPosition';

interface AppPopoverProps {
  btn: ReactNode;
  content: ReactNode;
  className?: string;
  positions?: 'top' | 'bottom' | 'right' | 'left';
}

const positionActiveStyle = (position: string, positionData: PositionData) => {
  switch (position) {
    case 'top':
      return { top: positionData.top, left: positionData.left };
    case 'right':
      return { left: positionData.left + (positionData.width || 0), top: positionData.top };
    case 'left':
      return { left: positionData.left, top: positionData.top };
    default:
      return { top: positionData.bottom, left: positionData.left };
  }
};

export const AppPopover = ({ className, btn, positions = 'bottom', content }: AppPopoverProps) => {
  const popoverWrapRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const position = useGetPosition(popoverWrapRef, active);

  const mods: Mods = {
    [cls.active]: active,
  };

  const openPopover = () => setActive((prevState) => !prevState);
  const closePopover = () => setActive(false);

  useOutsideClick(closePopover, popoverWrapRef, active, popoverRef);

  return (
    <div className={classNames(cls.popoverWrap, mods, [className, cls[positions]])}>
      <div ref={popoverWrapRef} onClick={openPopover}>
        {btn}
      </div>
      <div
        className={cls.content}
        style={positionActiveStyle(positions, position)}
        ref={popoverRef}
      >
        {content}
      </div>
    </div>
  );
};
