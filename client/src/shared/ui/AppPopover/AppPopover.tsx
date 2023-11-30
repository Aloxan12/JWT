import React, { ReactNode, useRef, useState } from 'react';
import cls from './AppPopover.module.scss';
import { classNames, Mods } from '../../lib/classNames/classNames';
import { useOutsideClick } from '../../lib/hooks/useOutsideClick';
import { PositionData, useGetPosition } from '../../lib/hooks/useGetPosition';

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
  const [position, setPosition] = useState<PositionData>({ top: 0, bottom: 0, right: 0, left: 0 });

  const mods: Mods = {
    [cls.active]: active,
  };
  const openPopover = () => setActive((prevState) => !prevState);
  const closePopover = () => setActive(false);

  useGetPosition(active, popoverWrapRef, setPosition);
  useOutsideClick(closePopover, popoverWrapRef, popoverRef);

  return (
    <div
      className={classNames(cls.popoverWrap, mods, [className, cls[positions]])}
      ref={popoverWrapRef}
      onClick={openPopover}
    >
      {btn}
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
