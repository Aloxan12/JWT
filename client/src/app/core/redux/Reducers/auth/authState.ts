import { IUser } from '../../../api/dto/UserDto';

type AuthInitialStateType = {
  user: IUser | null;
  token: string | null;
};

export const authInitialState: AuthInitialStateType = {
  user: null,
  token: null,
};
