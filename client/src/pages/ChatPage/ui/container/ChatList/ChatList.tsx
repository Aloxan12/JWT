import React from 'react';
import { Flex } from '../../../../../shared/ui/Flex/Flex';
import { ChatItem } from './ChatItem';
import cls from './ChatList.module.scss';
import { useGetAllChatsQuery } from '../../../../../app/core/api/chatApi';
import { IUser } from '../../../../../app/core/api/dto/UserDto';
import { RoleTypes } from '../../../../../app/core/router/AppRouter';

interface ChatListProps {
  currentUser: IUser | null;
}

export const ChatList = ({ currentUser }: ChatListProps) => {
  const { data: chatListData } = useGetAllChatsQuery();
  return (
    <Flex direction="column" gap="16" align="start" className={cls.chatList}>
      <ChatItem
        users={[
          {
            email: 'Общий',
            id: '1',
            avatar: '',
            role: RoleTypes.ADMIN,
            isActivated: false,
            status: '',
          },
        ]}
        isActive={false}
        currentUser={currentUser}
      />
      {chatListData?.results.map(({ id, users }) => (
        <ChatItem key={id} users={users} isActive={false} currentUser={currentUser} />
      ))}
    </Flex>
  );
};
