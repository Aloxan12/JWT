import App from "./App";
import {BrowserRouter, Navigate, Route, Routes, useLocation, useMatch, useNavigate} from 'react-router-dom'
import {Registration} from "./Pages/Registration/Registration";
import {Header} from "./Pages/Header/Header";
import {ToastContainer} from "react-toastify";
import React, {useEffect, useMemo} from "react";
import {Login} from "./Pages/Login/Login";
import {ComponentsShow} from "./Pages/ComponentsShow/ComponentsShow";
import {useSelector} from "react-redux";
import {RootState} from "./redux/store";

export const routes = [
    {
        id: 'Main',
        path: '/',
        // exact: true,
        component: <App/>,
        title: 'Главная'
    },
    {
        id: 'ComponentsShow',
        path: '/componentsShow',
        // exact: true,
        component: <ComponentsShow/>
    },
];

export const routesIsNotAuth = [
    {
        id: 'Registration',
        path: '/registration',
        // exact: true,
        component: <Registration/>
    },
    {
        id: 'Login',
        path: '/login',
        // exact: true,
        component: <Login/>
    },
];

export const routesForMenu = [
    {
        id: 'Main',
        path: '/',
        // exact: true,
        title: 'Главная'
    },
    {
        id: 'ComponentsShow',
        path: '/componentsShow',
        // exact: true,
        title: 'Компоненты'
    },
];

export const AppRedirect = ({path = '/'}: {
    path?: string
}) => {
    const location = useLocation()
    return <Navigate to={path} state={{from: location}} replace/>
}


export const getRouteConfig = (id: string) => {
    const route = routes.find(route => route.id === id);

    if (route) {
        const {component, ...rest} = route;

        return rest;
    }
}


export const AppRoutes = () => {
    const isAuth = useSelector<RootState, boolean>(state => state.auth.isAuth)
    return (
        <BrowserRouter>
            <Header itemsRoute={routesForMenu}/>
            <ToastContainer/>
            <Routes>
                {isAuth ? routes.map(route => {
                    const {id, component, path} = route;
                    return (
                        <Route key={id} path={path} element={component}/>
                    )
                }) :
                    routesIsNotAuth.map(route => {
                        const {id, component, path} = route;
                        return (
                            <Route key={id} path={path} element={component}/>
                        )
                    })}
            </Routes>
        </BrowserRouter>
    )
}