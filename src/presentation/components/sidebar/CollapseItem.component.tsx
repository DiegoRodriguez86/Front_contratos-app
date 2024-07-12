import { Accordion, AccordionItem } from '@nextui-org/react';
import { TiArrowSortedUp } from 'react-icons/ti';
import { ICollapseItem } from '../../interfaces/components/collapse-item.interface';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useMenuSideBar } from '../../hooks/components/sidebar/useMenuSideBar.hook';
import { useSideBarContext } from '../context/layout.context';


interface Props {
    icon: React.ReactNode;
    title: string;
    items: ICollapseItem[];
    isActive?: boolean;
}


export const CollapseItem = ({ icon, items, title, isActive }: Props) => {

const { setActiveMenu } = useMenuSideBar();
const { setCollapsed } = useSideBarContext();

const handleClick = () => {
    setActiveMenu(title);
    if (window.innerWidth < 768) {
        setCollapsed();
      }
};

    return (
        <div className='flex gap-4 h-full items-center cursor-pointer'>
            <Accordion className="px-0">
                <AccordionItem
                    indicator={<TiArrowSortedUp />}
                    className={clsx(
                        isActive
                            ? 'bg-primary-100 [&_svg_path]:fill-primary-500 rounded-md'
                            : 'hover:bg-default-100 rounded-md',
                    )}
                    classNames={{
                        indicator: 'data-[open=true]:-rotate-180',
                        trigger: 'py-0 min-h-[44px] hover:bg-default-100 rounded-xl active:scale-[0.98] transition-transform px-3.5',
                        title: 'px-0 flex text-base gap-2 h-full items-center cursor-pointer'
                    }}
                    aria-label="Accordion Catlogos"
                    title={
                        <div className="flex flex-row gap-2">
                            <span>{icon}</span>
                            <span>{title}</span>
                        </div>
                    }
                >
                    <div className="pl-12">
                        {items.map((item) => (
                            <Link 
                            to={item.url} 
                            key={item.url}
                            onClick={handleClick}
                            >
                                <span
                                    key={item.nombre}
                                    className="w-full flex  text-default-500 hover:text-default-900 transition-colors"
                                >
                                    {item.nombre}
                                </span>
                            </Link>
                        ))}
                    </div>
                </AccordionItem>
            </Accordion>
        </div>
    );
};
