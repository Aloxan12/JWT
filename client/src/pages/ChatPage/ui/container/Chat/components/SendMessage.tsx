import React from 'react';
import cls from '../Chat.module.scss';
import { AppTextarea } from '../../../../../../shared/ui/AppTextarea/AppTextarea';
import { AppButton } from '../../../../../../shared/ui/AppButton/AppButton';
import { Flex } from '../../../../../../shared/ui/Flex/Flex';

interface SendMessageProps {
  text: string;
  setText: (value: string) => void;
  sendMessage: () => void;
}

export const SendMessage = ({ text, setText, sendMessage }: SendMessageProps) => {
  return (
    <Flex className={cls.chatForm} max direction="column" gap="16">
      <AppTextarea placeholder="Введите текст" value={text} onChange={setText} rows="3" fullWidth />
      <AppButton onClick={sendMessage} text="Отправить" max theme="full-bg" size="big" />
    </Flex>
  );
};
