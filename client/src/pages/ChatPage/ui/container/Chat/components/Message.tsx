import { Flex } from '../../../../../../shared/ui/Flex/Flex';
import cls from '../Chat.module.scss';
import { IMessageResponse } from '../../../ChatPage';
import { AppAvatar } from '../../../../../../shared/ui/AppAvatar/AppAvatar';
import { AppText } from '../../../../../../shared/ui/AppText/AppText';
import { classNames, Mods } from '../../../../../../shared/lib/classNames/classNames';

interface MessageProps {
  message: IMessageResponse;
  isOwner: boolean;
}

export const Message = ({ message, isOwner }: MessageProps) => {
  const { text, user, event } = message;

  const mods: Mods = {
    [cls.owner]: isOwner,
  };

  if (event === 'greeting') {
    return (
      <Flex max justify="center">
        {text}
      </Flex>
    );
  }

  if (event === 'connection') {
    return (
      <Flex max justify="center" className={cls.connection}>
        {user.email} подключился к чату
      </Flex>
    );
  }

  return (
    <Flex max align="start" gap="32" className={classNames('', mods, [])}>
      <Flex direction="column" align="center">
        <AppAvatar src={user?.avatar} />
        <AppText text={user?.email} size="14" className={cls.email} />
      </Flex>
      <Flex align="start" gap="8" className={cls.messageWrap}>
        <div>{text}</div>
        <div className={cls.corner} />
      </Flex>
    </Flex>
  );
};
