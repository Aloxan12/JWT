import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { AppButton } from '../AppButton/AppButton';
import { TimeoutId } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types';

const items = Array.from({ length: 200 }, (_, index) => ({
  id: Math.random().toString(36).slice(2),
  text: String(index),
}));

const itemHeight = 40;
const containerHeight = 600;
const overScan = 3;
const scrollingDelay = 100;

export const AppVirtualizationPresentation = () => {
  const [listItems, setListItems] = useState(items);
  const [scrollTop, setScrollTop] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollElementRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const scrollElement = scrollElementRef?.current;
    if (!scrollElement) {
      return;
    }
    const handleScroll = () => {
      const scrollTop = scrollElement.scrollTop;
      setScrollTop(scrollTop);
    };
    handleScroll();
    scrollElement.addEventListener('scroll', handleScroll);
    return () => scrollElement.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const scrollElement = scrollElementRef?.current;
    if (!scrollElement) {
      return;
    }
    let timeoutId: TimeoutId | null = null;
    if (typeof timeoutId === 'number') {
      clearTimeout(timeoutId);
    }
    const handleScroll = () => {
      setIsScrolling(true);
      timeoutId = setTimeout(() => setIsScrolling(false), scrollingDelay);
    };
    handleScroll();
    scrollElement.addEventListener('scroll', handleScroll);
    return () => scrollElement.removeEventListener('scroll', handleScroll);
  }, []);

  const virtualItems = useMemo(() => {
    const rangeStart = scrollTop;
    const rangeEnd = scrollTop + containerHeight;

    let startIndex = Math.floor(rangeStart / itemHeight);
    let endIndex = Math.ceil(rangeEnd / itemHeight);

    startIndex = Math.max(0, startIndex - overScan);
    endIndex = Math.min(listItems.length - 1, endIndex + overScan);

    const virtualItems = [];
    for (let index = startIndex; index <= endIndex; index++) {
      virtualItems.push({
        index,
        offsetTop: index * itemHeight,
      });
    }
    return virtualItems;
  }, [scrollTop, listItems.length]);

  // const itemsToRender = listItems.slice(startIndex, endIndex + 1);
  const totalListHeight = itemHeight * listItems.length;

  console.log('virtualItems', virtualItems);
  return (
    <div style={{ padding: '0 12px' }}>
      <h1>list</h1>
      <div style={{ marginBottom: 12 }}>
        <AppButton
          text="reverse"
          onClick={() => setListItems((items) => items.slice().reverse())}
        />
      </div>
      <div
        ref={scrollElementRef}
        style={{
          height: containerHeight,
          overflow: 'auto',
          border: '1px solid lightgray',
          position: 'relative',
        }}
      >
        <div style={{ height: totalListHeight }}>
          {virtualItems.map((virtualItem) => {
            const item = listItems[virtualItem.index];
            return (
              <div
                style={{
                  height: itemHeight,
                  padding: '6px 12px',
                  position: 'absolute',
                  top: 0,
                  transform: `translateY(${virtualItem.offsetTop}px)`,
                }}
                key={item.id}
              >
                {isScrolling ? '...isScrolling' : item.text}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
