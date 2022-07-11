import {RoleTypes} from "../../../router/AppRoute";

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

export interface IUsersResponseDto{
    results: IUser[]
}
export interface IUsersRequestDto{
    search?: string | null
}