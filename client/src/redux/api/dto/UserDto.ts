import {RoleTypes} from "../../../router/AppRoute";
import {BaseQueryDto, IWithPagination} from "./BaseDto";

export interface IUserBase {
    email: string,
    isActivated: boolean
    role: RoleTypes
    avatar: string
    status: string | null
}

export interface IUser extends IUserBase{
    id: string,
}

export interface IUsersResponseDto extends BaseQueryDto{
    results: IUser[]
}
export interface IUsersRequestDto extends IWithPagination{
    search?: string | null
}