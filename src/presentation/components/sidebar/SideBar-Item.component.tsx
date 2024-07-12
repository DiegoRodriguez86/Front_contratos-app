import React from 'react';
import { useSideBarContext } from '../context/layout.context';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useMenuSideBar } from '../../hooks/components/sidebar/useMenuSideBar.hook';

interface Props {
  title: string;
  icon: React.ReactNode;
  isActive?: boolean;
  url: string;
}

export const SideBarItem = ({ icon, title, isActive, url }: Props) => {

  const { setCollapsed } = useSideBarContext();
  const {setActiveMenu} = useMenuSideBar();

  const handleClick = () => {
    setActiveMenu(title);
    if (window.innerWidth < 768) {
      setCollapsed();
    }
  };

  return (
    <div className="text-default-900 active:bg-none maw-w-full">
      <Link to={url}>
        <div className={clsx(
          isActive
            ? 'bg-primary-100 [&_svg_path]:fill-primary-500'
            : 'hover:bg-default-100',
          'flex gap-2 w-full min-h-[44px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]'
        )}
          onClick={handleClick}
        >
          {icon}
          <span className="text-default-900">{title}</span>
        </div></Link>
    </div>
  );
};
