import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { TimeoutId } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types';

type Key = string | number;

interface UseFixedSizeListProps {
  itemsCount: number;
  itemHeight?: (index: number) => number;
  estimateItemHeight?: (index: number) => number;
  getItemKey: (index: number) => Key;
  overscan?: number;
  scrollingDelay?: number;
  getScrollElement: () => HTMLElement | null;
}

const DEFAULT_OVERSCAN = 3;
const DEFAULT_SCROLLING_DELAY = 150;

function validateProps({ itemHeight, estimateItemHeight }: UseFixedSizeListProps) {
  if (!itemHeight && !estimateItemHeight) {
    throw new Error('you must pass either "estimateItemHeight" or "itemHeight" prop');
  }
}

export const useSizeList = ({
  itemHeight,
  itemsCount,
  getScrollElement,
  scrollingDelay = DEFAULT_SCROLLING_DELAY,
  overscan = DEFAULT_OVERSCAN,
  getItemKey,
  estimateItemHeight,
}: UseFixedSizeListProps) => {
  const [measurementCache, setMeasurementCache] = useState<Record<Key, number>>({});
  const [scrollTop, setScrollTop] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const [listHeight, setListHeight] = useState(0);

  useLayoutEffect(() => {
    const scrollElement = getScrollElement();
    if (!scrollElement) {
      return;
    }
    const resizeObserver = new ResizeObserver(([entry]) => {
      if (!entry) return;

      const height =
        entry.borderBoxSize[0]?.blockSize ?? entry.target.getBoundingClientRect().height;
      setListHeight(height);
    });
    resizeObserver.observe(scrollElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    const scrollElement = getScrollElement();
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
  }, [getScrollElement]);

  useEffect(() => {
    const scrollElement = getScrollElement();
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
  }, [getScrollElement]);

  const { virtualItems, startIndex, endIndex, totalHeight } = useMemo(() => {
    const getItemHeight = (index: number) => {
      if (itemHeight) {
        return itemHeight(index);
      }
      estimateItemHeight?.(index);
    };
    const rangeStart = scrollTop;
    const rangeEnd = scrollTop + listHeight;

    let totalHeight = 0;
    let startIndex = -1;
    let endIndex = -1;
    const allRows = Array(itemsCount);

    for (let index = 0; index < itemsCount; index++) {
      const row = {
        index,
        height: getItemHeight(index) || 0,
        offsetTop: totalHeight,
      };
      totalHeight += row.height;
      allRows[index] = row;

      if (startIndex === -1 && row.offsetTop + row.height > rangeStart) {
        startIndex = Math.max(0, index - overscan);
      }
      if (endIndex === -1 && row.offsetTop + row.height >= rangeEnd) {
        endIndex = Math.max(itemsCount - 1, index + overscan);
      }
    }

    const virtualItems = allRows.slice(startIndex, endIndex);

    return { virtualItems, startIndex, endIndex, allRows, totalHeight };
  }, [scrollTop, itemsCount, itemHeight, overscan]);

  return { virtualItems, startIndex, endIndex, isScrolling, totalHeight };
};
