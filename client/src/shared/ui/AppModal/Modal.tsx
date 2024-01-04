import { MutableRefObject, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { Portal } from '../Portal/Portal';
import cls from './Modal.module.scss';
import { Flex } from '../Flex/Flex';
import { classNames, Mods } from '../../lib/classNames/classNames';
import { onStopPropagationHandler } from '../../lib/onStopPropagationHandler';
import { AppIco } from '../AppSvg/AppIco';
import { ReactComponent as CloseIco } from '../../../utils/images/icons/close.svg';

interface ModalProps {
  className?: string;
  title?: string;
  icoClose?: boolean;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

const ANIMATION_DELAY = 300;

export const AppModal = (props: ModalProps) => {
  const { className, children, isOpen, onClose, lazy, title, icoClose } = props;

  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
  }, [isOpen]);

  const closeHandler = useCallback(() => {
    if (onClose) {
      setIsClosing(true);
      timerRef.current = setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, ANIMATION_DELAY);
    }
  }, [onClose]);

  // Новые ссылки!!!
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeHandler();
      }
    },
    [closeHandler]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
    }

    return () => {
      clearTimeout(timerRef.current);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  const mods: Mods = {
    [cls.opened]: isOpen,
    'app-modal': isOpen,
    [cls.isClosing]: isClosing,
  };

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal>
      <div className={classNames(cls.Modal, mods, [className])}>
        <div className={cls.overlay} onClick={closeHandler}>
          <div className={cls.content} onClick={onStopPropagationHandler}>
            {title && (
              <Flex align="center" gap="32" justify="between" className={cls.titleBlock}>
                <span className={cls.title}>{title}</span>
                {icoClose && (
                  <Flex align={'center'} gap="8">
                    <Flex
                      justify="center"
                      align="center"
                      className={cls.icoCloseBlock}
                      onClick={closeHandler}
                    >
                      <AppIco svg={CloseIco} />
                    </Flex>
                  </Flex>
                )}
              </Flex>
            )}
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};