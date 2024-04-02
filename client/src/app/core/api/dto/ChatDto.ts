import { BaseQueryDto, IWithPagination } from './BaseDto';
import { IUser } from './UserDto';

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
