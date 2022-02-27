import App from "./App";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {Registration} from "./Pages/Registration";
import {Header} from "./Pages/Header/Header";

export const routes = [
    {
        id: 'Main',
        path: '/',
        // exact: true,
        component: <App />
    },
    {
        id: 'Registration',
        path: '/registration',
        // exact: true,
        component: <Registration />
    },
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
            <Header />
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