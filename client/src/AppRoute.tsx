import App from "./App";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {Registration} from "./Pages/Registration/Registration";
import {Header} from "./Pages/Header/Header";
import {ToastContainer} from "react-toastify";
import React from "react";
import {Login} from "./Pages/Login/Login";
import {ComponentsShow} from "./Pages/ComponentsShow/ComponentsShow";

export const routes = [
    {
        id: 'Main',
        path: '/',
        // exact: true,
        component: <App />,
        title: 'Главная'
    },
    {
        id: 'Registration',
        path: '/registration',
        // exact: true,
        component: <Registration />
    },
    {
        id: 'Login',
        path: '/login',
        // exact: true,
        component: <Login />
    },
    {
        id: 'ComponentsShow',
        path: '/componentsShow',
        // exact: true,
        component: <ComponentsShow />
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
        id: 'Registration',
        path: '/registration',
        // exact: true,
        title: 'Регистрация'
    },
    {
        id: 'Login',
        path: '/login',
        // exact: true,
        title: 'Войти'
    },
    {
        id: 'ComponentsShow',
        path: '/componentsShow',
        // exact: true,
        title: 'Компаненты'
    }
];

export const getRouteConfig = (id: string) => {
    const route = routes.find(route => route.id === id);

    if (route) {
        const {component, ...rest} = route;

        return rest;
    }
}


export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Header itemsRoute={routesForMenu} />
            <ToastContainer/>
            <Routes>
                {routes.map(route => {
                    const {id, component, path} = route;
                    return (
                        <Route key={id} path={path} element={component} />
                    )
                })}
            </Routes>
        </BrowserRouter>
    )
}