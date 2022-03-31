import App from "../App";
import {BrowserRouter, Route, RouteObject, Routes} from 'react-router-dom'
import {Registration} from "../Pages/Registration/Registration";
import {Header} from "../Pages/Header/Header";
import {ToastContainer} from "react-toastify";
import React from "react";
import {Login} from "../Pages/Login/Login";
import {ComponentsShow} from "../Pages/ComponentsShow/ComponentsShow";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {NotFound} from "../Pages/NotFound/NotFound";
import {RoleTypes} from "./Roles";
import {IUserAuthState} from "../redux/authApi";

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
    {
        id: 'NotFound',
        path: '*',
        // exact: true,
        component: <NotFound />
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
    {
        id: 'NotFound',
        path: '*',
        // exact: true,
        component: <NotFound />
    },
];

type RoutesForMenuType = {
    [key in RoleTypes]: IRouteObj[]
}

export interface IRouteObj {
    id: string
    title: string
    path: string
    showInMenu: boolean
    component: JSX.Element
}

export const routesForMenu: RoutesForMenuType = {
    [RoleTypes.ADMIN]: [
        {
            id: 'Main',
            path: '/',
            title: 'Главная',
            showInMenu: true,
            component: <App/>,
        },
        {
            id: 'ComponentsShow',
            path: '/componentsShow',
            title: 'Компоненты',
            showInMenu: true,
            component: <ComponentsShow/>
        },
        {
            id: 'NotFound',
            path: '*',
            // exact: true,
            title: 'Не найдена',
            showInMenu: false,
            component: <NotFound />
        },
    ],
    [RoleTypes.USER]: [
        {
            id: 'Main',
            path: '/',
            title: 'Главная',
            showInMenu: true,
            component: <App/>,
        },
        {
            id: 'ComponentsShow',
            path: '/componentsShow',
            title: 'Компоненты',
            showInMenu: true,
            component: <ComponentsShow/>
        },
        {
            id: 'NotFound',
            path: '*',
            // exact: true,
            title: 'Не найдена',
            showInMenu: false,
            component: <NotFound />
        },
    ]
};

export const AppRoutes = () => {
    const isAuth = useSelector<RootState, boolean>(state => state.auth.isAuth)
    const user = useSelector<RootState, IUserAuthState | null>(state => state.auth.authData.user)
    return (
        <BrowserRouter>
            <Header itemsRoute={user ? routesForMenu[user.role] : []}/>
            <ToastContainer/>
            <Routes>
                {isAuth ? user ? routesForMenu[user.role].map(route => {
                    const {id, component, path} = route;
                    return (
                        <Route key={id} path={path} element={component}/>
                    )
                }) : [] :
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