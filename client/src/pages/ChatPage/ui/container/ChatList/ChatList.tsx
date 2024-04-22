import React, { useState } from 'react';
import { Flex } from '../../../../../shared/ui/Flex/Flex';
import { ChatItem } from './ChatItem';
import cls from './ChatList.module.scss';
import { useDeleteChatMutation, useGetAllChatsQuery } from '../../../../../app/core/api/chatApi';
import { IUser } from '../../../../../app/core/api/dto/UserDto';
import { RoleTypes } from '../../../../../app/core/router/AppRouter';
import { ToastWrapper, ToastWrapperType } from '../../../../../entities/ToastWrapper/ToastWrapper';
import { DeleteChatModal } from './DeleteChatModal/DeleteChatModal';

interface ChatListProps {
  currentUser: IUser | null;
  chooseChatId: string | null;
  onChooseChatHandler: (chatId: string | null) => () => void;
}

export const ChatList = ({ currentUser, chooseChatId, onChooseChatHandler }: ChatListProps) => {
  const [deleteChatId, setDeleteChatId] = useState<string | null>(null);
  const { data: chatListData } = useGetAllChatsQuery();
  const [deleteChat] = useDeleteChatMutation();

  const onDeleteChat = (id: string) => () => setDeleteChatId(id);
  const clearDeleteChat = () => setDeleteChatId(null);

  const deleteChatHandler = () => {
    if (deleteChatId) {
      deleteChat({ id: deleteChatId })
        .unwrap()
        .then(() => {
          ToastWrapper({
            msg: 'Чат успешно удален'.replace(/"/g, ''),
            type: ToastWrapperType.success,
          });
          setDeleteChatId(null);
        });
    }
  };
  console.log('deleteChatId', deleteChatId);
  return (
    <>
      <DeleteChatModal
        isOpen={!!deleteChatId}
        onClose={clearDeleteChat}
        onDeleteHandler={deleteChatHandler}
      />
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
            deleteChatHandler={onDeleteChat(id)}
          />
        ))}
      </Flex>
    </>
  );
};
