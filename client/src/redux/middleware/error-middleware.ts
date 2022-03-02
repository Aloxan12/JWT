import {isRejectedWithValue, Middleware, MiddlewareAPI } from "@reduxjs/toolkit"

export const rtkErrorMiddleware: Middleware =
    (api: MiddlewareAPI) => (next) => (action) => {
        if (isRejectedWithValue(action)) {
            console.log('api', api)
            console.log('next', next)
            console.log('action', action)
            console.log('action.payload', action.payload)
            if (action.payload.status === 401) {
                // api.dispatch(deleteCredentials())
            }
            console.log('action', action)
        }

        return next(action)
    }