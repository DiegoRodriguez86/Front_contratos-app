import { TiHomeOutline, TiThListOutline } from 'react-icons/ti';
import { SideBarItem } from './SideBar-Item.component';
import { Sidebar } from '../styles/sidebar.styles';
import { useSideBarContext } from '../context/layout.context';
import { SideBarMenu } from './SideBarMenu.component';
import { CollapseItem } from './CollapseItem.component';
import { ICollapseItem } from '../../interfaces/components/collapse-item.interface';
import { useMenuSideBar } from '../../hooks/components/sidebar/useMenuSideBar.hook';

const collapseItems: ICollapseItem[] = [
    { nombre: 'Usuarios', url: '/usuarios' },
    { nombre: 'Actividad Economica', url: '/actividadeconomica' },
    { nombre: 'Actividad IMSS', url: '/actividadimss'},
    { nombre: 'Banco', url: '/banco' },
    { nombre: 'Cargo', url: '/cargo'},
    { nombre: 'Cargo Sociedad', url: '/cargosociedad'},
    { nombre: 'Estado Empresa', url: '/estadoempresa'},
];

export const SideBar = () => {

    const { menuSelected } = useMenuSideBar();
    const { collapsed, setCollapsed } = useSideBarContext();
    return (
        <aside className="h-screen z-[20] sticky top-0">
            {collapsed ? (
                <div className={Sidebar.Overlay()} onClick={setCollapsed} />
            ) : null}
            <div className={Sidebar({
                collapsed: collapsed,
            })}
            >
                <div className={Sidebar.Header()}>
                </div>
                <div className="flex flex-col justify-between h-full">
                    <div className={Sidebar.Body()}>
                        <SideBarItem
                            key="home"
                            title="Home"
                            icon={<TiHomeOutline />}
                            isActive={menuSelected.homeMenu}
                            url="/home"
                        />
                        <SideBarMenu title="Menu">
                            <CollapseItem
                                key="catalogos"
                                icon={<TiThListOutline />}
                                items={collapseItems}
                                title="Catalogos"
                                isActive={menuSelected.catalogosMenu}
                            />
                        </SideBarMenu>
                    </div>
                </div>
            </div>
        </aside>
    );
};