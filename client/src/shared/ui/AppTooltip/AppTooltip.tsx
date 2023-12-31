import cls from './AppTooltip.module.scss';
import { classNames } from '../../lib/classNames/classNames';
import { ReactNode, useRef } from 'react';
import { useGetPosition } from '../../lib/hooks/useGetPosition';
import { useHover } from '../../lib/hooks/useHover';

interface AppTooltipProps {
  className?: string;
  children: ReactNode | string;
  tooltipContent: ReactNode | string;
  outsideClose?: boolean;
  positionContentV?: 'top' | 'bottom';
  positionContentH?: 'base' | 'left' | 'right';
}

export const AppTooltip = ({
  className,
  children,
  tooltipContent,
  positionContentV = 'top',
  positionContentH = 'base',
  outsideClose = false,
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
      {isHover && !outsideClose && (
        <div
          className={cls.tooltipContent}
          style={{
            top: position.top - (positionContentV === 'top' ? 0 : -(position?.height || 0)),
            left: positionContentH === 'left' ? position.left + position.width : position.left,
          }}
          onClick={(e) => e.preventDefault()}
        >
          {tooltipContent}
        </div>
      )}
    </div>
  );
};
