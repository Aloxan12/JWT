import React from 'react';
import cls from '../ChatPage.module.scss';
import { Flex } from '../../../../shared/ui/Flex/Flex';
import { IMessage } from '../ChatPage';

interface ChatProps {
  messages: IMessage[];
}

export const Chat = ({ messages }: ChatProps) => {
  return <Flex className={cls.chatListWrapper}>Chat</Flex>;
};
