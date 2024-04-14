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
  author: IUser | null;
  event: 'connection' | 'message';
  id?: number;
  chatId?: string;
}

export interface IMessageResponse {
  text: string;
  author: IUser;
  event: 'connection' | 'message' | 'greeting';
  id?: string;
  date?: string;
}

const ChatPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [messages, setMessages] = useState<IMessageResponse[]>([]);
  const [connected, setConnected] = useState(false);
  const [chooseChatId, setChooseChatId] = useState<null | string>(null);
  const socket = useRef<WebSocket | null>(null);
  const [createChat] = useCreateChatMutation();

  useWsConnect(socket, setConnected, setMessages, user);

  const onChooseChatHandler = (chatId: string | null) => () => {
    setMessages([]);
    setChooseChatId(chatId);
  };
  const onCreateChatHandler = () => {
    if (user?.id) {
      createChat({ users: [user?.id, '63a80567ff4493ffbde87247'] });
    }
  };
  return (
    <Flex gap="32" align="start" className={classNames(cls.chatPageWrapper)}>
      <AppButton text="Создать чат" onClick={onCreateChatHandler} />
      {!connected && <AppText text="Ошибка соединения" color="red" className={cls.errorText} />}
      <ChatList
        currentUser={user}
        chooseChatId={chooseChatId}
        onChooseChatHandler={onChooseChatHandler}
      />
      <Chat
        messages={messages}
        setMessages={setMessages}
        socket={socket}
        user={user}
        chatId={chooseChatId || undefined}
      />
    </Flex>
  );
};

export default ChatPage;
