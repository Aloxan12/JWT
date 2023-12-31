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
  positionContentV?: 'top' | 'bottom';
  positionContentH?: 'base' | 'left' | 'right';
}

export const AppTooltip = ({
  className,
  children,
  tooltipContent,
  positionContentV = 'top',
  positionContentH = 'base',
}: AppTooltipProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isHover, hoverFnBind] = useHover();
  const position = useGetPosition(ref, isHover);

  return (
    <div
      className={classNames(cls.tooltipWrap, {}, [
        cls[positionContentV],
        cls[positionContentH],
        className,
      ])}
      ref={ref}
      {...hoverFnBind}
    >
      {children}
      {isHover && (
        <div
          className={cls.tooltipContent}
          style={{
            top: position.top - (positionContentV === 'top' ? 0 : -(position?.height || 0)),
            left: positionContentH === 'left' ? position.left + position.width : position.left,
          }}
          onClick={onStopPropagationHandler}
        >
          {tooltipContent}
        </div>
      )}
    </div>
  );
};
