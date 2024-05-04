import React, { MutableRefObject, ReactNode, useCallback, useRef, useState } from 'react';
import { classNames, Mods } from '../../lib/classNames/classNames';
import cls from './AppAnimationModal.module.scss';
import { Portal } from '../Portal/Portal';
import { onStopPropagationHandler } from '../../lib/onStopPropagationHandler';

interface AppAnimationModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children: ReactNode;
  lazy?: boolean;
}

const ANIMATION_DELAY = 300;

export const AppAnimationModal = ({ isOpen, onClose, children, lazy }: AppAnimationModalProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

  const closeHandler = useCallback(() => {
    if (onClose) {
      setIsClosing(true);
      timerRef.current = setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, ANIMATION_DELAY);
    }
  }, [onClose]);

  const mods: Mods = {
    [cls.isOpen]: isOpen,
    [cls.isClosing]: isClosing,
  };

  if ((lazy && !isMounted) || !isOpen) {
    return null;
  }

  return (
    <Portal>
      <div className={classNames(cls.modal, mods, [])}>
        <div className={cls.overlay} onClick={closeHandler}>
          <div className={cls.content} onClick={onStopPropagationHandler}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
