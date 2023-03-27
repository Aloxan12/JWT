import React, { useEffect, useState } from 'react';
// import './style.scss'

export interface IAppScrollWrapperProps {
  childrenRef: React.MutableRefObject<HTMLDivElement | null>;
  children: JSX.Element;
  mode?: 'button' | 'scroll';
  showIn?: 'table' | 'dropdown';
  changeContent?: any;
}

export const AppScrollWrapper = ({
  children,
  childrenRef,
  mode,
  showIn = 'table',
  changeContent,
}: IAppScrollWrapperProps) => {
  const ref = childrenRef.current;
  const [scrollDisableUp, setScrollDisableUp] = useState(true);
  const [scrollDisableDown, setScrollDisableDown] = useState(true);

  const [scrollDisableLeft, setScrollDisableLeft] = useState(true);
  const [scrollDisableRight, setScrollDisableRight] = useState(true);

  const handleScrollDown = () => {
    setScrollDisableUp(false);
    ref?.scrollBy({
      top: 100,
      behavior: 'smooth',
    });
    if (!!ref && ref.scrollHeight - (ref.scrollTop + ref?.clientHeight) <= 100) {
      setScrollDisableDown(true);
    }
  };

  useEffect(() => {
    if (!!ref && ref.scrollHeight - (ref.scrollTop + ref?.clientHeight) >= 100) {
      setScrollDisableDown(false);
    }
    if (!!ref && ref.scrollWidth - (ref.clientWidth + ref.scrollLeft) >= 100) {
      setScrollDisableRight(false);
    }
    if (!!ref && ref.scrollHeight === ref.clientHeight) {
      setScrollDisableDown(true);
    }
  }, [ref, changeContent]);

  const handleScrollUp = () => {
    ref?.scrollBy({
      top: -100,
      behavior: 'smooth',
    });
    if ((ref?.scrollTop && ref?.scrollTop - 100 <= 0) || ref?.scrollTop === 0) {
      setScrollDisableUp(true);
    }
    if (!!ref && ref.scrollHeight - (ref.scrollTop + ref?.clientHeight) <= 100) {
      setScrollDisableDown(false);
    }
  };

  const handleScrollRight = () => {
    setScrollDisableLeft(false);
    ref?.scrollBy({
      left: 100,
      behavior: 'smooth',
    });
    if (!!ref && ref.scrollWidth - (ref.clientWidth + ref.scrollLeft) <= 100) {
      setScrollDisableRight(true);
    }
  };

  const handleScrollLeft = () => {
    ref?.scrollBy({
      left: -100,
      behavior: 'smooth',
    });
    if ((ref?.scrollLeft && ref?.scrollLeft - 100 <= 0) || ref?.scrollLeft === 0) {
      setScrollDisableLeft(true);
    }
    if (!!ref && ref.scrollWidth - (ref.clientWidth + ref.scrollLeft) <= 100) {
      setScrollDisableRight(false);
    }
  };

  return (
    <div className="scroll-wrap">
      <div
        className={`scroll-content ${mode === 'scroll' ? 'scroll-mode' : ''}`}
        style={{ maxHeight: ref?.clientHeight, height: ref?.clientHeight }}
      >
        {children}
        {!childrenRef || (scrollDisableDown && scrollDisableUp) || mode !== 'button' ? (
          <></>
        ) : (
          <div className={`scroll-arrows-vertical ${showIn === 'table' ? 'table-style' : ''}`}>
            <button
              onClick={handleScrollUp}
              className={`arrow-up ${scrollDisableUp ? 'disabled' : ''}`}
              disabled={scrollDisableUp}
            >
              <i className="an-ico an-ico-arrow-down-bg" />
            </button>
            <button
              onClick={handleScrollDown}
              className={`arrow-down ${scrollDisableDown ? 'disabled' : ''}`}
              disabled={scrollDisableDown}
            >
              <i className="an-ico an-ico-arrow-down-bg" />
            </button>
          </div>
        )}
      </div>
      {!childrenRef || mode !== 'button' || (scrollDisableLeft && scrollDisableRight) ? (
        <></>
      ) : (
        <div className="scroll-arrows-horizontal">
          <button
            onClick={handleScrollLeft}
            className={`arrow-left ${scrollDisableLeft ? 'disabled' : ''}`}
            disabled={scrollDisableLeft}
          >
            <i className="an-ico an-ico-arrow-down-bg" />
          </button>
          <button
            onClick={handleScrollRight}
            className={`arrow-right ${scrollDisableRight ? 'disabled' : ''}`}
            disabled={scrollDisableRight}
          >
            <i className="an-ico an-ico-arrow-down-bg" />
          </button>
        </div>
      )}
    </div>
  );
};
