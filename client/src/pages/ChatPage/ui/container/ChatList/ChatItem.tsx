import React from 'react';
import { classNames, Mods } from '../../../../../shared/lib/classNames/classNames';
import cls from './ChatList.module.scss';
import { IUser } from '../../../../../app/core/api/dto/UserDto';
import { Flex } from '../../../../../shared/ui/Flex/Flex';
import { AppAvatar } from '../../../../../shared/ui/AppAvatar/AppAvatar';
import { AppIco } from '../../../../../shared/ui/AppSvg/AppIco';
import { ReactComponent as CloseIco } from '../../../../../shared/assets/icons/close.svg';

interface ChatItemProps {
  users: IUser[];
  currentUser: IUser | null;
  isActive: boolean;
  onClick: () => void;
  deleteChatHandler?: () => void;
}

export const ChatItem = ({
  users,
  isActive,
  currentUser,
  onClick,
  deleteChatHandler,
}: ChatItemProps) => {
  const mods: Mods = {
    [cls.active]: isActive,
  };
  return (
    <div className={classNames(cls.chatItem, mods, [])} onClick={isActive ? undefined : onClick}>
      {users
        .filter((user) => user.id !== currentUser?.id)
        .map(({ email, avatar, id }) => (
          <Flex gap="8" key={id}>
            <AppAvatar src={avatar} />
            <span>{email}</span>
            {id !== '1' && (
              <AppIco svg={CloseIco} className={cls.ico} onClick={deleteChatHandler} size="big" />
            )}
          </Flex>
        ))}
    </div>
  );
};
