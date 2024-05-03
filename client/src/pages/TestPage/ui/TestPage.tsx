import React, { MutableRefObject, ReactNode, useRef, useState } from 'react';
import cls from './TestPage.module.scss';
import { AppButton } from '../../../shared/ui/AppButton/AppButton';
import { Portal } from '../../../shared/ui/Portal/Portal';
import { classNames, Mods } from '../../../shared/lib/classNames/classNames';

const TestPage = () => {
  const [active, setActive] = useState(false);

  const closeHandler = () => setActive(false);
  const setActiveHandler = () => setActive((prev) => !prev);

  return (
    <div className={cls.testPageWrap}>
      <div className={cls.animationBlock}>{active && <div className={cls.whiteCircle} />}</div>
      <AppAnimationModal isOpen={active} onClose={closeHandler}>
        <div></div>
      </AppAnimationModal>
      <AppButton text={active ? 'Закрыть' : 'Открыть'} onClick={setActiveHandler} />
    </div>
  );
};

export default TestPage;

interface AppAnimationModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children: ReactNode;
  lazy?: boolean;
}

const AppAnimationModal = ({ isOpen, onClose, children, lazy }: AppAnimationModalProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

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
        <div className={cls.overlay}>
          <div className={cls.content}>{children}</div>
        </div>
      </div>
    </Portal>
  );
};
