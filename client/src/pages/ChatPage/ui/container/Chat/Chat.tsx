import React, { useEffect, useState } from 'react';
import cls from './Chat.module.scss';
import { Flex } from '../../../../../shared/ui/Flex/Flex';
import { IMessage, IMessageResponse } from '../../ChatPage';
import { AppTextarea } from '../../../../../shared/ui/AppTextarea/AppTextarea';
import { AppButton } from '../../../../../shared/ui/AppButton/AppButton';
import { Message } from './components/Message';
import { IUser } from '../../../../../app/core/api/dto/UserDto';
import { useGetMessagesListQuery } from '../../../../../app/core/api/chatApi';

interface ChatProps {
  user: IUser | null;
  chatId?: string;
  messages: IMessageResponse[];
  socket: React.MutableRefObject<WebSocket | null>;
  setMessages: React.Dispatch<React.SetStateAction<IMessageResponse[]>>;
}

export const Chat = ({ messages, socket, user, setMessages, chatId }: ChatProps) => {
  const { data: messagesList } = useGetMessagesListQuery({ chatId, limit: 20 });

  const [text, setText] = useState('');

  useEffect(() => {
    if (messagesList) {
      const newArr: IMessageResponse[] = messagesList.results.map(
        ({ text, id, author, publicDate }) => ({
          text,
          event: 'message',
          id,
          author,
          date: publicDate,
        })
      );
      setMessages((prevState) => [...prevState, ...newArr]);
    }
  }, [messagesList]);

  const sendMessage = () => {
    const newMessage: IMessage = {
      author: user,
      text,
      event: 'message',
      chatId,
    };
    socket?.current?.send(JSON.stringify(newMessage));
    setText('');
  };
  return (
    <Flex align="start" direction="column" gap="32" className={cls.chatListWrapper}>
      <Flex direction="column" align="start" gap="16" className={cls.chatList} max>
        {messages.map((message, index) => (
          <Message
            key={`${index}-${message.id}`}
            message={message}
            isOwner={user?.id === message?.author?.id}
          />
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
