import React, { useCallback, useRef, useState } from 'react';
import { AppButton } from '../AppButton/AppButton';
import { useSizeList } from './hooks/useSizeList';

const items = Array.from({ length: 200 }, (_, index) => ({
  id: Math.random().toString(36).slice(2),
  text: String(index),
}));

const containerHeight = 600;

export const AppVirtualizationPresentation = () => {
  const [listItems, setListItems] = useState(items);
  const scrollElementRef = useRef<HTMLDivElement | null>(null);

  const { isScrolling, virtualItems, totalHeight, measureElement } = useSizeList({
    estimateItemHeight: useCallback(() => 40, []),
    getItemKey: useCallback((index: number) => listItems[index].id, [listItems]),
    itemsCount: listItems.length,
    getScrollElement: useCallback(() => scrollElementRef.current, []),
  });

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
        <div style={{ height: totalHeight }}>
          {virtualItems.map((virtualItem) => {
            const item = listItems[virtualItem.index];
            return (
              <div
                ref={measureElement}
                data-index={virtualItem.index}
                style={{
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
