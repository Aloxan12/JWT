import React, { useState } from 'react';
import cls from './Tooltip.module.scss';

type TooltipType = {
  delay?: number;
  direction?: 'top' | 'bottom' | 'left' | 'right';
  content?: string;
  children?: React.ReactNode;
};

export const Tooltip = (props: TooltipType) => {
  let timeout: ReturnType<typeof setTimeout>;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, props.delay || 400);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div className={cls.TooltipWrapper} onMouseEnter={showTip} onMouseLeave={hideTip}>
      {props.children}
      {active && (
        <div
          className={
            `${cls.TooltipTip} ` + `${props.direction ? cls[props.direction] : cls['top']} `
          }
        >
          {props.content}
        </div>
      )}
    </div>
  );
};
