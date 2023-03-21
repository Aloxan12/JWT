import React, { useRef, useState } from 'react';
import './AppScrollWrapper.scss';

export interface IAppScrollWrapperProps {
  childrenRef: React.MutableRefObject<HTMLDivElement | null>;
  children: JSX.Element;
}

export const AppScrollWrapper = ({ children, childrenRef }: IAppScrollWrapperProps) => {
  const ref = childrenRef.current;
  const [scrollDisableUp, setScrollDisableUp] = useState(true);
  const [scrollDisableDown, setScrollDisableDown] = useState(false);

  const handleScrollDown = () => {
    setScrollDisableUp(false);
    ref?.scrollBy({
      top: 100,
      behavior: 'smooth',
    });
    console.log('redfff', !!ref && ref.scrollHeight - (ref.scrollTop + 200));
    if (!!ref && ref.scrollHeight - (ref.scrollTop + 200) <= 100) {
      setScrollDisableDown(true);
      console.log('ndene');
    }
  };
  //
  // useEffect(() => {
  //   if (tableEl?.clientHeight || 200 > (tableEl?.scrollHeight || 0)) {
  //     setScrollDisableDown(true);
  //   }
  // });

  const handleScrollUp = () => {
    ref?.scrollBy({
      top: -100,
      behavior: 'smooth',
    });
    if ((ref?.scrollTop && ref?.scrollTop - 100 <= 0) || ref?.scrollTop === 0) {
      setScrollDisableUp(true);
    }
    if (!!ref && ref.scrollHeight - (ref.scrollTop + 200) <= 100) {
      setScrollDisableDown(false);
    }
  };
  return (
    <div className="scroll-wrap">
      <div className={'scroll-content'}>
        <div className={'scroll-arrows'}>
          <button onClick={handleScrollUp} className={'arrow-up'} disabled={scrollDisableUp}>
            Scroll Up
          </button>
          <button onClick={handleScrollDown} className={'arrow-up'} disabled={scrollDisableDown}>
            Scroll Down
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
