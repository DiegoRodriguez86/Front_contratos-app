import { useState } from 'react';
import { SideBarContext } from './context/layout.context';
import { SideBar } from './sidebar/SideBar.component';
import { NavBarWrapper } from './navbar/NavBarWrapper.component';



interface Props{
    children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    //const [_, setLocked] = useLockedBody(false);
    const handleToggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
        //setLocked(!sidebarOpen);
    };

    return (
        <SideBarContext.Provider value={{ collapsed: sidebarOpen, setCollapsed: handleToggleSidebar }}>
            <section className="flex">
                <SideBar />
                <NavBarWrapper>{children}</NavBarWrapper>
            </section>
        </SideBarContext.Provider>
    );
};