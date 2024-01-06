import React, { useState } from 'react';
import trashIco from '../../../utils/images/trash.png';
import cls from './AppTrash.module.scss';
import { AppPhoto } from '../AppPhoto/AppPhoto';
import { AppModal } from '../AppModal/Modal';
import { classNames } from '../../lib/classNames/classNames';
import { AppButton } from '../AppButton/AppButton';
import { Flex } from '../Flex/Flex';

interface IAppTrashProps {
  size?: 'big' | 'medium' | 'small';
  deleteHandler: (onClose?: () => void) => void;
  text?: string;
}

export const AppTrash = ({ size = 'big', deleteHandler, text }: IAppTrashProps) => {
  const [active, setActive] = useState<boolean>(false);

  const onOpen = () => setActive(true);
  const onClose = () => setActive(false);
  return (
    <React.Fragment>
      <AppPhoto
        src={trashIco}
        alt="корзина"
        className={classNames(cls.trash, {}, [cls[size]])}
        onClick={onOpen}
      />
      <AppModal isOpen={active} onClose={onClose} title="Предупреждение" lazy>
        <Flex direction="column" gap="16" align="start">
          <div>{text || 'Удалить?'}</div>
          <Flex justify="between" max>
            <AppButton onClick={onClose} title="нет" theme="full-bg" />
            <AppButton
              onClick={() => {
                deleteHandler(onClose);
              }}
              theme="full-bg"
              title="да"
            />
          </Flex>
        </Flex>
      </AppModal>
    </React.Fragment>
  );
};
