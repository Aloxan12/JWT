import { IndexRouteObject, NonIndexRouteObject } from 'react-router-dom';

export enum RoleTypes {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface IRoutesByRole {
  roles: RoleTypes[];
}

interface RouteObjectExtendedBase {
  roles?: RoleTypes[];
}

interface IndexRouteObjectExtended extends IndexRouteObject, RouteObjectExtendedBase {}

interface NonIndexRouteObjectExtended extends NonIndexRouteObject, RouteObjectExtendedBase {
  children?: IRouteObjectExtended[];
}

export type IRouteObjectExtended = IndexRouteObjectExtended | NonIndexRouteObjectExtended;
