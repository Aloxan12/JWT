import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {authApi} from "./authApi";
import {rtkErrorMiddleware} from "./middleware/error-middleware";
import authReducer from "./Reducers/authReducer/authReducer";
import { useDispatch } from "react-redux";
import {postApi} from "./postApi";


const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    auth: authReducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware)=>
            getDefaultMiddleware({serializableCheck: false}).concat(authApi.middleware, postApi.middleware).concat(rtkErrorMiddleware)
    })
}

const store = setupStore()

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export const useAppDispatch = () => useDispatch<AppDispatch>()