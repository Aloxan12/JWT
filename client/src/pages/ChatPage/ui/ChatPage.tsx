import React from 'react';
import cls from './ChatPage.module.scss';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { ChatList } from './container/ChatList/ChatList';
import { Chat } from './container/Chat';
import { Flex } from '../../../shared/ui/Flex/Flex';

const ChatPage = () => {
  return (
    <Flex gap="32" align="start" className={classNames(cls.chatPageWrapper)}>
      <ChatList />
      <Chat />
    </Flex>
  );
};

export default ChatPage;
