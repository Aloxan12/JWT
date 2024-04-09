import { BaseQueryDto, IWithPagination } from './BaseDto';
import { IUser } from './UserDto';

export interface IMessageBase {
  text: string;
  chatId: string;
}

export interface IMessageCreate extends IMessageBase {
  author: string;
}

export interface IMessageDto extends IMessageBase {
  id: string;
  author: IUser;
  publicDate: string;
  chatId: string;
}

export interface IMessageResponse extends BaseQueryDto {
  results: IMessageDto[];
}

export interface IMessageRequest extends IWithPagination {
  search?: string;
  chatId?: string;
}

export interface IChat {
  users: IUser[];
}

export interface ICreateChat {
  users: string[];
}

export interface IChatDto extends IChat {
  id: string;
}

export interface IChatsResponseDto extends BaseQueryDto {
  results: IChatDto[];
}

export interface IChatRequestDto extends IWithPagination {
  search?: string | null;
}
