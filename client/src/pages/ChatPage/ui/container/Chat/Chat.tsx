import React, { useEffect, useRef, useState } from 'react';
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
  const lastElRef = useRef<HTMLDivElement | null>(null);
  const [firstLoad, setFirstLoad] = useState(true);
  const [loadMore, setLoadMore] = useState(true);
  const { data: messagesList } = useGetMessagesListQuery({ chatId, limit: 20 });

  const [text, setText] = useState('');

  useEffect(() => {
    if (lastElRef.current && firstLoad && messagesList) {
      const container = lastElRef.current;
      lastElRef.current?.scrollTo({
        top: container.scrollHeight - container.clientHeight,
        behavior: 'smooth',
      });
      setFirstLoad(false);
    }
  }, [messagesList]);

  useEffect(() => {
    if (messagesList && loadMore) {
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
  console.log('lastElRef', lastElRef);
  return (
    <Flex align="start" direction="column" gap="32" className={cls.chatListWrapper}>
      <div className={cls.chatList} ref={lastElRef}>
        {messages.map((message, index) => (
          <Message
            key={`${index}-${message.id}`}
            message={message}
            isOwner={user?.id === message?.author?.id}
          />
        ))}
      </div>
      <Flex className={cls.chatForm} max direction="column" gap="16">
        <AppTextarea
          placeholder="Введите текст"
          value={text}
          onChange={setText}
          rows="3"
          fullWidth
        />
        <AppButton
          onClick={() => console.log('lastElRef', lastElRef.current?.scrollTop)}
          text="lastElRef"
          max
          theme="full-bg"
          size="big"
        />
        <AppButton onClick={sendMessage} text="Отправить" max theme="full-bg" size="big" />
      </Flex>
    </Flex>
  );
};
