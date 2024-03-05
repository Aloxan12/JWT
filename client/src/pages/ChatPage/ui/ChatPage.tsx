import React, { useRef, useState } from 'react';
import cls from './ChatPage.module.scss';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { ChatList } from './container/ChatList/ChatList';
import { Chat } from './container/Chat';
import { Flex } from '../../../shared/ui/Flex/Flex';
import { localWs, webSocket } from '../../../app/core/api/authApi';
import { AppButton } from '../../../shared/ui/AppButton/AppButton';

interface IMessage {
  text: string;
  username: string;
  event: string;
  id: 1234;
}

const message = {
  event: 'connection',
  username: 'alex',
  id: 1234,
  text: '1 est',
};

const ChatPage = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [connected, setConnected] = useState(false);
  const socket = useRef<WebSocket | null>(null);

  function connect() {
    socket.current = new WebSocket(localWs);
    socket.current.onopen = () => {
      console.log('meme');
      setConnected(true);
      socket.current?.send(JSON.stringify(message));
      console.log('WebSocket connection opened');
    };
    socket.current.onmessage = (event) => {
      const data = event.data;
      console.log('data,', data);
      const message: IMessage = JSON.parse(event.data);
      setMessages((prevState) => [...prevState, message]);
      console.log('Received message:', message);
    };
    socket.current.onclose = (event) => {
      console.log('WebSocket connection closed', event);
    };
  }

  const getMessageHandler = () => {
    if (socket.current) {
      socket.current.onmessage = (event) => {
        const message: IMessage = JSON.parse(event.data);
        setMessages((prevState) => [...prevState, message]);
        console.log('event', event);
      };
    }
  };
  const sendMessage = () => {
    webSocket.send(JSON.stringify(message));
  };

  return (
    <Flex gap="32" align="start" className={classNames(cls.chatPageWrapper)}>
      {connected ? (
        <Flex>
          <AppButton text="получить сообщения" onClick={getMessageHandler} />
          <AppButton text="отправить сообщения" onClick={sendMessage} />
        </Flex>
      ) : (
        <AppButton text="Войти" onClick={connect} />
      )}
      {messages.map((item, index) => (
        <div key={index}>{item.text}</div>
      ))}
      <ChatList />
      <Chat />
    </Flex>
  );
};

export default ChatPage;
