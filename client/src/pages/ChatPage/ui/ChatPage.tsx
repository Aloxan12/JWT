import React, { useRef, useState } from 'react';
import cls from './ChatPage.module.scss';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { ChatList } from './container/ChatList/ChatList';
import { Chat } from './container/Chat';
import { Flex } from '../../../shared/ui/Flex/Flex';
import { useWsConnect } from '../helpers/connectionWs';
import { useAppSelector } from '../../../app/core/redux/store';
import { AppText } from '../../../shared/ui/AppText/AppText';

export interface IMessage {
  text: string;
  username: string;
  event: string;
  id?: 1234;
}

const ChatPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [connected, setConnected] = useState(false);
  const socket = useRef<WebSocket | null>(null);

  useWsConnect(socket, setConnected, setMessages);

  return (
    <Flex gap="32" align="start" className={classNames(cls.chatPageWrapper)}>
      {connected && <AppText text="Ошибка соединения" color="red" className={cls.errorText} />}
      <ChatList />
      <Chat messages={messages} socket={socket} username={user?.email || 'Не указан'} />
    </Flex>
  );
};

export default ChatPage;
