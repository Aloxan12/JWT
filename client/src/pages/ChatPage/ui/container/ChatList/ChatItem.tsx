import React from 'react';
import { classNames, Mods } from '../../../../../shared/lib/classNames/classNames';
import cls from './ChatList.module.scss';
import { IUser } from '../../../../../app/core/api/dto/UserDto';
import { Flex } from '../../../../../shared/ui/Flex/Flex';
import { AppAvatar } from '../../../../../shared/ui/AppAvatar/AppAvatar';

interface ChatItemProps {
  users: IUser[];
  currentUser: IUser | null;
  isActive: boolean;
}

export const ChatItem = ({ users, isActive, currentUser }: ChatItemProps) => {
  const mods: Mods = {
    [cls.active]: isActive,
  };
  return (
    <div className={classNames(cls.chatItem, mods, [])}>
      {users
        .filter((user) => user.id !== currentUser?.id)
        .map(({ email, avatar, id }) => (
          <Flex gap="8" key={id}>
            <AppAvatar src={avatar} />
            <span>{email}</span>
          </Flex>
        ))}
    </div>
  );
};
