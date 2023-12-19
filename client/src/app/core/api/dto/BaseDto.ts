import { IUser } from './UserDto';

export interface BaseQueryDto {
  count: number;
}

export interface IWithPagination {
  limit?: number;
  page?: number;
}

export interface LoginResponse {
  accessToken: string;
  user: IUser | null;
}
