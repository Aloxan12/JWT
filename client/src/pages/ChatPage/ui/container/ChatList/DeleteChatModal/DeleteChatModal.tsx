import React from 'react';
import { AppModal } from '../../../../../../shared/ui/AppModal/Modal';
import { Flex } from '../../../../../../shared/ui/Flex/Flex';
import { AppButton } from '../../../../../../shared/ui/AppButton/AppButton';
import { AppText } from '../../../../../../shared/ui/AppText/AppText';

interface DeleteChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeleteHandler: () => void;
}

export const DeleteChatModal = ({ isOpen, onClose, onDeleteHandler }: DeleteChatModalProps) => {
  return (
    <AppModal isOpen={isOpen} title="Предупреждение!!!" onClose={onClose} lazy>
      <Flex direction="column" gap="16">
        <AppText text="Вы действительно хотите удалить данный чат?" />
        <Flex max justify="between" gap="16">
          <AppButton text="Отменить" onClick={onClose} max />
          <AppButton text="Удалить" onClick={onDeleteHandler} max theme="full-bg" />
        </Flex>
      </Flex>
    </AppModal>
  );
};
