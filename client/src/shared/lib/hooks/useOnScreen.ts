import { useCallback, useState } from 'react';

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

interface UseOnScreenResult {
  measureRef: (node: HTMLElement | null) => void;
  isIntersecting: boolean;
  observer: IntersectionObserver | undefined;
}

export const useOnScreen = ({
  root = null,
  rootMargin = '0px',
  threshold = 0,
}: IntersectionObserverOptions = {}): UseOnScreenResult => {
  const [observer, setObserver] = useState<IntersectionObserver>();
  const [isIntersecting, setIntersecting] = useState(false);

  const measureRef = useCallback(
    (node: HTMLElement | null) => {
      if (node) {
        const newObserver = new IntersectionObserver(
          ([entry]) => {
            setIntersecting(entry.isIntersecting);
          },
          { root, rootMargin, threshold }
        );

        newObserver.observe(node);
        setObserver(newObserver);
      }
    },
    [root, rootMargin, threshold]
  );

  return { measureRef, isIntersecting, observer };
};
