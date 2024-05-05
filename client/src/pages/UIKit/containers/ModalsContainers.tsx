import React, { useState } from 'react';
import { AppCard } from '../../../shared/ui/AppCard/AppCard';
import { Flex } from '../../../shared/ui/Flex/Flex';
import { AppButton } from '../../../shared/ui/AppButton/AppButton';
import { AppModal } from '../../../shared/ui/AppModal/Modal';
import { AppAnimationModal } from '../../../shared/ui/AppAnimationModal/AppAnimationModal';

export const ModalsContainers = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenAnimateModal, setIsOpenAnimateModal] = useState(false);

  const openModalHandler = () => setIsOpenModal(true);
  const closeModalHandler = () => setIsOpenModal(false);

  const openAnimateModalHandler = () => setIsOpenAnimateModal(true);
  const closeAnimateModalHandler = () => setIsOpenAnimateModal(false);

  return (
    <>
      <AppAnimationModal isOpen={isOpenAnimateModal} onClose={closeAnimateModalHandler}>
        <div>Модальное окно с анимацией</div>
      </AppAnimationModal>
      <AppModal title="title" isOpen={isOpenModal} onClose={closeModalHandler}>
        <div>Модальное окно</div>
      </AppModal>
      <AppCard max title="Модальные окна" withoutBorder>
        <Flex wrap max gap="16">
          <AppButton text="Обычная модалка" onClick={openModalHandler} />
          <AppButton text="Модалка с анимацией" onClick={openAnimateModalHandler} />
        </Flex>
      </AppCard>
    </>
  );
};
