import React from 'react';
import { classNames, Mods } from '../../../../../shared/lib/classNames/classNames';
import cls from './ChatList.module.scss';

interface ChatItemProps {
  name: string;
}

export const ChatItem = ({ name }: ChatItemProps) => {
  const mods: Mods = {
    [cls.active]: name === 'Общий',
  };
  return <div className={classNames(cls.chatItem, mods, [])}>{name}</div>;
};
