import { IMenuList } from './menu-list.interface';
import { INavBar } from './nav-bar.interface';


export interface ILayout extends INavBar{
    children?: JSX.Element[] | JSX.Element;
    includeInitRouter?: boolean;
    routeList: IMenuList[];
    addSupPath?: string;
}