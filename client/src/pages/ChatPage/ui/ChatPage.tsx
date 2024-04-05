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
import { AppButton } from '../../../shared/ui/AppButton/AppButton';
import { useCreateChatMutation } from '../../../app/core/api/chatApi';

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
  const [createChat] = useCreateChatMutation();

  useWsConnect(socket, setConnected, setMessages, user);
  const onCreateChatHandler = () => {
    createChat({ users: ['63b35d86700fdd1bfce446fc', '661032c1cdbf542e415d2fc9'] });
  };
  return (
    <Flex gap="32" align="start" className={classNames(cls.chatPageWrapper)}>
      <AppButton text="Создать чат" onClick={onCreateChatHandler} />
      {!connected && <AppText text="Ошибка соединения" color="red" className={cls.errorText} />}
      <ChatList currentUser={user} />
      <Chat messages={messages} socket={socket} user={user} />
    </Flex>
  );
};

export default ChatPage;
