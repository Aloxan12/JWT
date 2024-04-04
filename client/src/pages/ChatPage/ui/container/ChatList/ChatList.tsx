import React from 'react';
import { Flex } from '../../../../../shared/ui/Flex/Flex';
import { ChatItem } from './ChatItem';
import cls from './ChatList.module.scss';
import { useGetAllChatsQuery } from '../../../../../app/core/api/chatApi';

const chatsList = [
  { id: 1, name: 'Общий' },
  { id: 2, name: 'Петя' },
  { id: 3, name: 'Дима' },
  { id: 4, name: 'Вова' },
  { id: 5, name: 'Кирил с длинным именем' },
];

export const ChatList = () => {
  const { data: chatListData } = useGetAllChatsQuery();
  return (
    <Flex direction="column" gap="16" align="start" className={cls.chatList}>
      {chatsList.map(({ id, name }) => (
        <ChatItem key={id} name={name} />
      ))}
    </Flex>
  );
};
