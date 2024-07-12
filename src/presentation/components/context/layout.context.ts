import { createContext, useContext } from "react";


interface SideBarContextProps {
    collapsed: boolean;
    setCollapsed: () => void;
}

export const SideBarContext = createContext<SideBarContextProps>({
    collapsed: false,
    setCollapsed: () => {},
});

export const useSideBarContext = () => {
    return useContext(SideBarContext);
}