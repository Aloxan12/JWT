import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {authApi} from "./authApi";
import {rtkErrorMiddleware} from "./middleware/error-middleware";


const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware)=>
            getDefaultMiddleware({serializableCheck: false}).concat(authApi.middleware).concat(rtkErrorMiddleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']