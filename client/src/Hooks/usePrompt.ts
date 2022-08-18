import * as React from 'react';
import { UNSAFE_NavigationContext, useSearchParams } from 'react-router-dom';
import type { History, Blocker, Transition } from 'history';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

export function useBlocker(blocker: Blocker, when = true): void {
  const navigator = React.useContext(UNSAFE_NavigationContext).navigator as History;

  React.useEffect(() => {
    if (!when) return;

    const unblock = navigator.block((tx: Transition) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        },
      };

      blocker(autoUnblockingTx);
    });

    return unblock;
  }, [navigator, blocker, when]);
}

const skipBlockedLink = () => {
  let cache: { [key in string]: boolean } = {};
  return (nextPath: string, keywords: string[]): boolean => {
    if (!!nextPath) {
      if (nextPath in cache) {
        return cache[nextPath];
      } else {
        let result: boolean = false;
        for (let i = 0; i < keywords.length; i++) {
          if (nextPath.match(keywords[i])) {
            result = true;
            break;
          }
        }
        cache[nextPath] = result;
        return result;
      }
    } else {
      return false;
    }
  };
};

const skipBlockedLinkFn = skipBlockedLink();

export function useCallbackPrompt(
  when: boolean,
  except?: string[] // массив роутов, которые не блокируем
): [showPrompt: boolean, confirmNavigation: () => void, cancelNavigation: () => void] {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showPrompt, setShowPrompt] = useState(false);
  const [lastLocation, setLastLocation] = useState<any>(null);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);
  const [confirmedParams, setConfirmedParams] = useState(false);

  const cancelNavigation = useCallback(() => {
    setShowPrompt(false);
  }, []);

  const handleBlockedNavigation = useCallback(
    (nextLocation) => {
      if (!confirmedNavigation && nextLocation.location.pathname !== location.pathname) {
        if (except && skipBlockedLinkFn(nextLocation.location.pathname, except)) {
          setConfirmedNavigation(true);
        } else {
          setShowPrompt(true);
        }
        setLastLocation(nextLocation);
        return false;
      }
      if (
        !confirmedParams &&
        nextLocation.location.pathname === location.pathname &&
        nextLocation.location.search !== location.search
      ) {
        if (except && skipBlockedLinkFn(nextLocation.location.pathname, except)) {
          setConfirmedNavigation(true);
        } else {
          setShowPrompt(true);
        }
        setLastLocation(nextLocation);
        return false;
      }
      return true;
    },
    [confirmedNavigation, confirmedParams]
  );

  const confirmNavigation = useCallback(() => {
    setShowPrompt(false);
    setConfirmedNavigation(true);
  }, []);

  useEffect(() => {
    if (confirmedNavigation && lastLocation) {
      searchParams.toString();
      setSearchParams(searchParams.toString());
      navigate(
        `${lastLocation.location.pathname}${
          !!lastLocation.location.search
            ? lastLocation.location.search.replace(/-10/g, '0')
            : '?limit=10&offset=0'
        }`
      );
      setConfirmedParams(false);
      setConfirmedNavigation(false);
    }
  }, [confirmedNavigation, lastLocation]);

  useBlocker(handleBlockedNavigation, when);

  return [showPrompt, confirmNavigation, cancelNavigation];
}
