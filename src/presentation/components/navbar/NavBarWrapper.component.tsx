import { Navbar, NavbarContent } from '@nextui-org/react';
import { BurgerButton } from './BurgerButton.component';
import { UserDropDown } from './UserDropDown.component';


interface Props {
  children: React.ReactNode;
}

export const NavBarWrapper = ({ children }: Props) => {
  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Navbar
        isBordered
        classNames={{
          wrapper: 'w-full max-w-full',
        }}
      >
        <NavbarContent className="md:hidden" key={'button'}>
          <BurgerButton />
        </NavbarContent>
        <NavbarContent className="w-full max-md:hidden" key={'separador'}>
        </NavbarContent>
        <NavbarContent
          justify="end"
          className="w-fit data-[justify=end]:flex-grow-0"
          key={'userDropDown'}
        >
            <UserDropDown />
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
};
