import React, { ReactNode, useRef } from 'react';
import cls from './AppPopover.module.scss';
import { classNames, Mods } from '../../lib/classNames/classNames';
import { useOutsideClick } from '../../lib/hooks/useOutsideClick';
import { useGetPosition } from '../../lib/hooks/useGetPosition';
import { positionActiveStyle } from './helpers/positionActiveStyle';

interface AppPopoverProps {
  active?: boolean;
  setActive?: React.Dispatch<React.SetStateAction<boolean>>;
  btn: ReactNode;
  content: ReactNode;
  className?: string;
  classNameContent?: string;
  positionsV?: 'top' | 'bottom';
  positionsH?: 'left' | 'right' | 'base';
}

export const AppPopover = ({
  className,
  classNameContent,
  btn,
  positionsV = 'bottom',
  positionsH = 'base',
  content,
  active,
  setActive,
}: AppPopoverProps) => {
  const popoverWrapRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const position = useGetPosition(popoverWrapRef, !!active);

  const mods: Mods = {
    [cls.active]: active,
  };

  const openPopover = () => setActive?.((prevState) => !prevState);
  const closePopover = () => setActive?.(false);

  useOutsideClick(closePopover, popoverWrapRef, active, popoverRef);

  return (
    <div
      className={classNames(cls.popoverWrap, mods, [cls[positionsV], cls[positionsH], className])}
    >
      <div ref={popoverWrapRef} onClick={openPopover}>
        {btn}
      </div>
      <div
        className={classNames(cls.content, {}, [classNameContent])}
        style={positionActiveStyle(positionsV, position, positionsH)}
        ref={popoverRef}
      >
        {content}
      </div>
    </div>
  );
};
