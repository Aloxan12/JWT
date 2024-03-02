import React, { useEffect } from 'react';
import cls from './ChatPage.module.scss';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { ChatList } from './container/ChatList/ChatList';
import { Chat } from './container/Chat';
import { Flex } from '../../../shared/ui/Flex/Flex';
import { socket } from '../../../app/core/api/authApi';

const ChatPage = () => {
  useEffect(() => {
    console.log('cd');
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });
    socket.on('emit', (data) => {
      console.log('Received message:', data);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Flex gap="32" align="start" className={classNames(cls.chatPageWrapper)}>
      <ChatList />
      <Chat />
    </Flex>
  );
};

export default ChatPage;
