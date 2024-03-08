import React, { useRef, useState } from 'react';
import cls from './ChatPage.module.scss';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { ChatList } from './container/ChatList/ChatList';
import { Chat } from './container/Chat';
import { Flex } from '../../../shared/ui/Flex/Flex';
import { webSocket } from '../../../app/core/api/authApi';
import { AppButton } from '../../../shared/ui/AppButton/AppButton';
import { connect } from '../helpers/connectionWs';
import { useAppSelector } from '../../../app/core/redux/store';

export interface IMessage {
  text: string;
  username: string;
  event: string;
  id?: 1234;
}

const message = {
  event: 'connection',
  username: 'alex',
  id: 1234,
  text: '1 est',
};

const ChatPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [connected, setConnected] = useState(false);
  const socket = useRef<WebSocket | null>(null);
  const [text, setText] = useState('');

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
    const newMessage: IMessage = {
      username: user?.email || 'email скрыт',
      text,
      event: 'message',
    };
    webSocket.send(JSON.stringify(newMessage));
  };

  const onConnectHandler = () => connect(socket, setConnected, setMessages);

  return (
    <Flex gap="32" align="start" className={classNames(cls.chatPageWrapper)}>
      {connected ? (
        <Flex>
          <AppButton text="получить сообщения" onClick={getMessageHandler} />
          <AppButton text="отправить сообщения" onClick={sendMessage} />
        </Flex>
      ) : (
        <AppButton text="Войти" onClick={onConnectHandler} />
      )}
      <Flex direction="column" gap="8">
        {messages.map((item, index) => (
          <div key={index}>{item.text}</div>
        ))}
      </Flex>
      <ChatList />
      <Chat />
    </Flex>
  );
};

export default ChatPage;
