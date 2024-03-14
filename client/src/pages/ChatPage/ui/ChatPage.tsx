import React, { useRef, useState } from 'react';
import cls from './ChatPage.module.scss';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { ChatList } from './container/ChatList/ChatList';
import { Chat } from './container/Chat';
import { Flex } from '../../../shared/ui/Flex/Flex';
import { AppButton } from '../../../shared/ui/AppButton/AppButton';
import { useWsConnect } from '../helpers/connectionWs';
import { useAppSelector } from '../../../app/core/redux/store';

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

  const getMessageHandler = () => {
    if (socket.current) {
      socket.current.onmessage = (event) => {
        const message: IMessage = JSON.parse(event.data);
        setMessages((prevState) => [...prevState, message]);
        console.log('event', event);
      };
    }
  };
  useWsConnect(socket, setConnected, setMessages);

  return (
    <Flex gap="32" align="start" className={classNames(cls.chatPageWrapper)}>
      <Flex>
        <AppButton text="получить сообщения" onClick={getMessageHandler} />
      </Flex>
      <ChatList />
      <Chat messages={messages} socket={socket} username={user?.email || 'Не указан'} />
    </Flex>
  );
};

export default ChatPage;
