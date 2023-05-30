import { ReactNode } from "react";
import { MenuItem } from "./Layout/MainLayout";
import Button from "./Button";

const Sidebar = (props: {
  menuList: MenuItem[];
  selectHandler?: (component: ReactNode) => void;
}) => {
  const { menuList } = props;

  //Build Menu items
  const buildMenu = () => {
    return menuList.map((menuItem, index) => {
      return (
        <div className=" my-2" key={index}>
          {/* <span className="ml-5 text-xs font-semibold tracking-widest text-stoneGray">
                  
                </span> */}
          <Button
            customCssProps=""
            key={menuItem.id}
            buttonId={menuItem.id}
            type={"button"}
            colorScheme={"white"}
            variant={"ghost"}
            padding={"normal"}
            radius={"rightFull"}
            lightIcon
            fullWidth
            iconPaddingFull
            justifyContent={"start"}
            icon={menuItem.icon}
          >
            {menuItem.title}
          </Button>
        </div>
      );
    });
  };

  return (
    <>
      {/* <div className="justify-left relative flex h-14 flex-row items-center  border-b border-divider py-2 px-3 align-middle "></div> */}
      {/* {buildMenu()} */}
      {buildMenu()}
      <div className="absolute bottom-0 flex w-64 flex-col border-t border-divider">
        {/* <span className="text-center">LOGOUT</span> */}
        {/* <Header /> */}
      </div>
    </>
  );
};

export default Sidebar;
