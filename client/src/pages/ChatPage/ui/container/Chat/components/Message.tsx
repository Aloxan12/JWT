import { Flex } from '../../../../../../shared/ui/Flex/Flex';
import cls from '../Chat.module.scss';
import { IMessageResponse } from '../../../ChatPage';

interface MessageProps {
  message: IMessageResponse;
}

export const Message = ({ message }: MessageProps) => {
  const { text, user, event } = message;
  return (
    <Flex direction="column" align="start" gap="8" className={cls.messageWrap}>
      <Flex>
        {user?.email}
        {/*<AppAvatar />*/}
      </Flex>
      <div>{text}</div>
    </Flex>
  );
};
