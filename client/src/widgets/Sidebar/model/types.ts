import { ReactComponent } from '*.svg';
import { RoleTypes } from '../../../app/core/router/types';

export interface ISidebarItem {
  name: string;
  path: string;
  ico?: typeof ReactComponent;
  roles?: RoleTypes[];
}
