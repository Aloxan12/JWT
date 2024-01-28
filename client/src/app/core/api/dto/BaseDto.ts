import { IUser } from './UserDto';

export interface BaseQueryDto {
  prevPage: number | null;
  nextPage: number | null;
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
