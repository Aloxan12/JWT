import {Navigate, useLocation } from "react-router-dom"

interface IRedirect {
    path?: string
}

export const AppRedirect = ({ path = '/' }: IRedirect) => {
    const location = useLocation()
    return <Navigate to={path} state={{ from: location }} replace />
}