import React, { useCallback, useEffect, useRef, useState } from 'react';
import cls from './Chat.module.scss';
import { Flex } from '../../../../../shared/ui/Flex/Flex';
import { IMessage, IMessageResponse } from '../../ChatPage';
import { Message } from './components/Message';
import { IUser } from '../../../../../app/core/api/dto/UserDto';
import { useGetMessagesListQuery } from '../../../../../app/core/api/chatApi';
import { SendMessage } from './components/SendMessage';

interface ChatProps {
  user: IUser | null;
  chatId?: string;
  messages: IMessageResponse[];
  socket: React.MutableRefObject<WebSocket | null>;
  setMessages: React.Dispatch<React.SetStateAction<IMessageResponse[]>>;
}

export const Chat = ({ messages, socket, user, setMessages, chatId }: ChatProps) => {
  const lastElRef = useRef<HTMLDivElement | null>(null);
  const [loadMore, setLoadMore] = useState(true);
  const { data: messagesList } = useGetMessagesListQuery({ chatId, limit: 20 });

  const [text, setText] = useState('');

  useEffect(() => {
    if (lastElRef.current) {
      lastElRef.current?.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [messages]);

  useEffect(() => {
    if (messagesList) {
      const newArr: IMessageResponse[] = [...messagesList.results]
        .reverse()
        .map(({ text, id, author, publicDate }) => ({
          text,
          event: 'message',
          id,
          author,
          date: publicDate,
        }));
      setMessages((prevState) => [...prevState, ...newArr]);
      setLoadMore(false);
    }
  }, [messagesList]);

  const sendMessage = useCallback(() => {
    const newMessage: IMessage = {
      author: user,
      text,
      event: 'message',
      chatId,
    };
    socket?.current?.send(JSON.stringify(newMessage));
    setText('');
  }, [text, user, chatId]);

  return (
    <Flex align="start" direction="column" gap="32" className={cls.chatListWrapper}>
      <div className={cls.chatList}>
        {messages.map((message, index) => (
          <Message
            key={`${index}-${message.id}`}
            message={message}
            isOwner={user?.id === message?.author?.id}
          />
        ))}
        <div ref={lastElRef} />
      </div>
      <SendMessage text={text} setText={setText} sendMessage={sendMessage} />
    </Flex>
  );
};
