import axios from "axios"
import {AuthState, IUserAuthState} from "./authApi";

export const checkAuthApi = async () => {
    try {
        return await axios.get<{
            accessToken: string
            refreshToken: string
            user: IUserAuthState
        }>('http://localhost:5555/api/refresh', {headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                refreshToken: `${localStorage.getItem('refreshToken')}`,
            }}).then(res => res.data)
    } catch (e) {
        console.log(e)
    }
}