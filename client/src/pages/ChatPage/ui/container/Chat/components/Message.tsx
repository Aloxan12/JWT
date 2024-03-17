import { Flex } from '../../../../../../shared/ui/Flex/Flex';
import cls from '../Chat.module.scss';
import { IMessage } from '../../../ChatPage';

interface MessageProps {
  message: IMessage;
}

export const Message = ({ message }: MessageProps) => {
  const { text, username, event } = message;
  return (
    <Flex direction="column" align="start" gap="8" className={cls.messageWrap}>
      <Flex>
        {username}
        {/*<AppAvatar />*/}
      </Flex>
      <div>{text}</div>
    </Flex>
  );
};
