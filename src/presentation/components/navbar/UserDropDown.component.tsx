import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, NavbarItem } from '@nextui-org/react';
import { useAuthNavBar } from '../../hooks/components/navbar/useNavBar.hook';

export const UserDropDown = () => {

    const {logout} = useAuthNavBar();

    return (
        <Dropdown className="dark">
            <NavbarItem>
                <DropdownTrigger>
                    <Avatar showFallback as='button' color='primary' size='md' src='https://images.unsplash.com/broken' />
                </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu aria-label='User menu actions' onAction={() => {}}>
                <DropdownItem key='profile' className='flex flex-col justify-start w-full items-start'>
                    <p className="text-white">Usuario:</p>
                    <p className="text-white text-lg ">Admin</p>
                </DropdownItem>
                    <DropdownItem
                        key='logout'
                        color='danger'
                        className='text-danger'
                        onPress={logout}>
                        Log Out
                    </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};
