import { useSideBarContext } from '../context/layout.context';
import { StyleBurgerButton } from '../styles/navbar.styles';



export const BurgerButton = () => {
  const { setCollapsed } = useSideBarContext();
  return (
    <div
    className={StyleBurgerButton()}
    // open={collapsed}
    onClick={setCollapsed}
  >
    <div />
    <div />
  </div>
  );
};
