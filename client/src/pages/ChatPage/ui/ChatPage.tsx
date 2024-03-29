import React, { useRef, useState } from 'react';
import cls from './ChatPage.module.scss';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { ChatList } from './container/ChatList/ChatList';
import { Chat } from './container/Chat/Chat';
import { Flex } from '../../../shared/ui/Flex/Flex';
import { useWsConnect } from '../helpers/connectionWs';
import { useAppSelector } from '../../../app/core/redux/store';
import { AppText } from '../../../shared/ui/AppText/AppText';
import { IUser } from '../../../app/core/api/dto/UserDto';

export interface IMessage {
  text: string;
  user: IUser | null;
  event: 'connection' | 'message';
  id?: 1234;
}

export interface IMessageResponse {
  text: string;
  user: IUser;
  event: 'connection' | 'message' | 'greeting';
  id?: 1234;
}

const ChatPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [messages, setMessages] = useState<IMessageResponse[]>([]);
  const [connected, setConnected] = useState(false);
  const socket = useRef<WebSocket | null>(null);

  useWsConnect(socket, setConnected, setMessages, user);

  return (
    <Flex gap="32" align="start" className={classNames(cls.chatPageWrapper)}>
      {!connected && <AppText text="Ошибка соединения" color="red" className={cls.errorText} />}
      <ChatList />
      <Chat messages={messages} socket={socket} user={user} />
    </Flex>
  );
};

export default ChatPage;
