import { IMenuList } from '../../interfaces/components/menu-list.interface';



export interface ISidebar {
	route_List: IMenuList[];
	setOpenSideBar: (data: boolean) => void;
	addSupPath?: string;
}

export interface ISidebarRedux {
	homeMenu: boolean;
	catalogosMenu: boolean;
}

export interface RootState {
	sidebar: ISidebarRedux;
}

export const defaultValueSidebar: ISidebarRedux = {
	homeMenu: false,
	catalogosMenu: false,
};