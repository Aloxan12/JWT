import React from 'react';
import { Flex } from '../../../../../shared/ui/Flex/Flex';
import { ChatItem } from './ChatItem';
import cls from './ChatList.module.scss';
import { useDeleteChatMutation, useGetAllChatsQuery } from '../../../../../app/core/api/chatApi';
import { IUser } from '../../../../../app/core/api/dto/UserDto';
import { RoleTypes } from '../../../../../app/core/router/AppRouter';
import { ToastWrapper, ToastWrapperType } from '../../../../../entities/ToastWrapper/ToastWrapper';

interface ChatListProps {
  currentUser: IUser | null;
  chooseChatId: string | null;
  onChooseChatHandler: (chatId: string | null) => () => void;
}

export const ChatList = ({ currentUser, chooseChatId, onChooseChatHandler }: ChatListProps) => {
  const { data: chatListData } = useGetAllChatsQuery();
  const [deleteChat] = useDeleteChatMutation();

  const deleteChatHandler = (id: string) => () => {
    deleteChat({ id })
      .unwrap()
      .then(() =>
        ToastWrapper({
          msg: 'Чат успешно удален'.replace(/"/g, ''),
          type: ToastWrapperType.success,
        })
      );
  };

  return (
    <Flex direction="column" gap="16" align="start" className={cls.chatList}>
      <ChatItem
        users={[
          {
            email: 'Общий',
            id: '1',
            avatar: '',
            role: RoleTypes.ADMIN,
            isActivated: true,
            status: '',
          },
        ]}
        isActive={!chooseChatId}
        currentUser={currentUser}
        onClick={onChooseChatHandler(null)}
      />
      {chatListData?.results.map(({ id, users }) => (
        <ChatItem
          key={id}
          users={users}
          isActive={chooseChatId === id}
          currentUser={currentUser}
          onClick={onChooseChatHandler(id)}
          deleteChatHandler={deleteChatHandler(id)}
        />
      ))}
    </Flex>
  );
};
