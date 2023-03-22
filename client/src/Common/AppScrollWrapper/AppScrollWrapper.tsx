import React, { useEffect, useState } from 'react';
import './AppScrollWrapper.scss';

export interface IAppScrollWrapperProps {
  childrenRef: React.MutableRefObject<HTMLDivElement | null>;
  children: JSX.Element;
  height: number;
  mode?: 'button' | 'scroll';
}

export const AppScrollWrapper = ({
  children,
  childrenRef,
  height,
  mode,
}: IAppScrollWrapperProps) => {
  const ref = childrenRef.current;
  const [scrollDisableUp, setScrollDisableUp] = useState(true);
  const [scrollDisableDown, setScrollDisableDown] = useState(false);

  const handleScrollDown = () => {
    setScrollDisableUp(false);
    ref?.scrollBy({
      top: 100,
      behavior: 'smooth',
    });
    if (!!ref && ref.scrollHeight - (ref.scrollTop + height) <= 100) {
      setScrollDisableDown(true);
    }
  };

  useEffect(() => {
    if (!!ref && ref.scrollHeight - (ref.scrollTop + height) <= 100) {
      setScrollDisableDown(true);
    }
  }, [ref]);

  const handleScrollUp = () => {
    ref?.scrollBy({
      top: -100,
      behavior: 'smooth',
    });
    if ((ref?.scrollTop && ref?.scrollTop - 100 <= 0) || ref?.scrollTop === 0) {
      setScrollDisableUp(true);
    }
    if (!!ref && ref.scrollHeight - (ref.scrollTop + height) <= 100) {
      setScrollDisableDown(false);
    }
  };
  return (
    <div className="scroll-wrap">
      <div
        className={`scroll-content ${mode === 'scroll' ? 'scroll-mode' : ''}`}
        style={{ maxHeight: height, height: height }}
      >
        {children}
        {(scrollDisableDown && scrollDisableUp) || mode !== 'button' ? (
          <></>
        ) : (
          <div className={'scroll-arrows'}>
            <button
              onClick={handleScrollUp}
              className={`arrow-up ${scrollDisableUp ? 'disabled' : ''}`}
              disabled={scrollDisableUp}
            >
              Scroll Up
            </button>
            <button
              onClick={handleScrollDown}
              className={`arrow-down ${scrollDisableDown ? 'disabled' : ''}`}
              disabled={scrollDisableDown}
            >
              Scroll Down
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
