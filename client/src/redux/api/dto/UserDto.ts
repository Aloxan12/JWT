import {RoleTypes} from "../../../router/AppRoute";
import {BaseQueryDto} from "./BaseDto";

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
export interface IUsersRequestDto{
    search?: string | null
}