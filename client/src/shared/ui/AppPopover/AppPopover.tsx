import React, { ReactNode, useRef, useState } from 'react';
import cls from './AppPopover.module.scss';
import { classNames, Mods } from '../../lib/classNames/classNames';
import { useOutsideClick } from '../../lib/hooks/useOutsideClick';

interface AppPopoverProps {
  btn: ReactNode;
  content: ReactNode;
  className?: string;
  positions?: 'top' | 'bottom' | 'right' | 'left';
}

export const AppPopover = ({ className, btn, positions = 'bottom', content }: AppPopoverProps) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [position, setPosition] = useState({ top: 0, bottom: 0, right: 0, left: 0 });

  const mods: Mods = {
    [cls.active]: active,
  };
  const openPopover = () => setActive(true);
  const closePopover = () => setActive(true);

  useOutsideClick(closePopover, popoverRef);

  return (
    <div
      className={classNames(cls.popoverWrap, mods, [className, positions])}
      ref={popoverRef}
      onClick={openPopover}
    >
      {btn}
      <div className={cls.content}>{content}</div>
    </div>
  );
};
