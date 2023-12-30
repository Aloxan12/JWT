import cls from './AppTooltip.module.scss';
import { classNames } from '../../lib/classNames/classNames';
import { ReactNode, useRef } from 'react';
import { useGetPosition } from '../../lib/hooks/useGetPosition';
import { useHover } from '../../lib/hooks/useHover';
import { onStopPropagationHandler } from '../../lib/onStopPropagationHandler';

interface AppTooltipProps {
  className?: string;
  children: ReactNode | string;
  tooltipContent: ReactNode | string;
}

export const AppTooltip = ({ className, children, tooltipContent }: AppTooltipProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isHover, hoverFnBind] = useHover();
  const position = useGetPosition(ref, isHover);

  return (
    <div className={classNames(cls.tooltipWrap, {}, [className])} ref={ref} {...hoverFnBind}>
      {children}
      {isHover && (
        <div
          className={cls.tooltipContent}
          style={{ top: position.top, left: position.left }}
          onClick={onStopPropagationHandler}
        >
          {tooltipContent}
        </div>
      )}
    </div>
  );
};
