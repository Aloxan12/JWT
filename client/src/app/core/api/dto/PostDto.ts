import { BaseQueryDto, IWithPagination } from './BaseDto';

interface IAuthor {
  id: string;
  avatar: string | null;
  email: string;
}

export interface IPost {
  author: IAuthor;
  postText: string;
  publicDate: string;
  id: string;
  likeCount: number;
  isLike: boolean;
}

export interface ICreatePost {
  author: string;
  postText: string;
  publicDate: string;
}

export interface IPostsResponseDto extends BaseQueryDto {
  results: IPost[];
}

export interface IPostRequestDto extends IWithPagination {
  search?: string | null;
}
