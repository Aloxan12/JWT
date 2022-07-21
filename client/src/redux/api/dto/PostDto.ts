import {BaseQueryDto} from "./BaseDto";

export interface IPost{
    author: string
    postText: string
    publicDate: string
    id: string
}

export interface ICreatePost{
    author: string
    postText: string
    publicDate: string
}

export interface IPostsResponseDto extends BaseQueryDto{
    results: IPost[]
}