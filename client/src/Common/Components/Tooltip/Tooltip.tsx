import React, { useState } from 'react';
import styles from './Tooltip.module.css';

type TooltipType = {
  delay?: number;
  direction?: string;
  content?: string;
  children?: React.ReactNode;
  textColor?: 'green';
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
    <div
      className={styles.TooltipWrapper}
      // When to show the tooltip
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {/* Wrapping */}
      {props.children}
      {active && (
        <div
          className={
            `${styles.TooltipTip} ` +
            `${props.direction ? styles[props.direction] : styles['top']} ` +
            `${props.textColor && styles[props.textColor]}`
          }
        >
          {/* Content */}
          {props.content}
        </div>
      )}
    </div>
  );
};
