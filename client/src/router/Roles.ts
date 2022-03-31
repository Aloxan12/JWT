import { RouteObject } from "react-router-dom"

type AllRoutesType = {
    [key in string]: {title: string, path: string}
}

const allRoutes:AllRoutesType = {
    main: {path:'/', title:'Главная'},
    componentsShow: {path:'/componentsShow', title:'Компоненты'},
    posts: {path:'/posts', title:'Посты'},
    notFound: {path:'*', title:'Не найдена'}
}

export enum RoleTypes {
    ADMIN = 'ADMIN',
    USER = 'USER',
}



const uniqRoutesByRole = {
    [RoleTypes.ADMIN]:[
        {
            path: allRoutes.posts.path,
            title: allRoutes.posts.title
        }
    ],
    [RoleTypes.USER]:[]
}