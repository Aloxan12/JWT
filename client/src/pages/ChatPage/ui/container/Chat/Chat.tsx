import React, { useState } from 'react';
import cls from './Chat.module.scss';
import { Flex } from '../../../../../shared/ui/Flex/Flex';
import { IMessage, IMessageResponse } from '../../ChatPage';
import { AppTextarea } from '../../../../../shared/ui/AppTextarea/AppTextarea';
import { AppButton } from '../../../../../shared/ui/AppButton/AppButton';
import { Message } from './components/Message';
import { IUser } from '../../../../../app/core/api/dto/UserDto';

interface ChatProps {
  user: IUser | null;
  messages: IMessageResponse[];
  socket: React.MutableRefObject<WebSocket | null>;
}

export const Chat = ({ messages, socket, user }: ChatProps) => {
  const [text, setText] = useState('');

  const sendMessage = () => {
    const newMessage: IMessage = {
      user,
      text,
      event: 'message',
    };
    socket?.current?.send(JSON.stringify(newMessage));
    // webSocket?.send(JSON.stringify(newMessage));
    setText('');
  };

  return (
    <Flex align="start" direction="column" gap="32" className={cls.chatListWrapper}>
      <Flex direction="column" align="start" gap="16" className={cls.chatList} max>
        {messages.map((message, index) => (
          <Message key={`${index}-${message.id}`} message={message} />
        ))}
      </Flex>
      <Flex className={cls.chatForm} max direction="column" gap="16">
        <AppTextarea
          placeholder="Введите текст"
          value={text}
          onChange={setText}
          rows="3"
          fullWidth
        />
        <AppButton onClick={sendMessage} text="Отправить" max theme="full-bg" size="big" />
      </Flex>
    </Flex>
  );
};
