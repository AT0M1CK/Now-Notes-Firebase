import { ReactNode, useContext, useEffect, useState } from "react";
import { MenuItem } from "./Layout/MainLayout";
import Button from "./UI/Button";
import { MainContext } from "./Contexts/MainContext";

const Sidebar = (props: {
  menuList: MenuItem[];
  selectHandler?: (component: ReactNode) => void;
}) => {
  const { setTitle } = useContext(MainContext);
  const [currentSelectedMenu, setCurrentSelectedMenu] = useState(0);

  const { menuList, selectHandler } = props;

  const menuHandler = (id: number, component: ReactNode) => {
    setCurrentSelectedMenu(id);
    if (selectHandler) {
      selectHandler(component);
    }
    sessionStorage.setItem("currentSelectedMenu", id.toString());
    if (setTitle) {
      setTitle(menuList[id].title);
    }
  };

  useEffect(() => {
    const currentId = sessionStorage.getItem("currentSelectedMenu");
    if (currentId) {
      const id = parseInt(currentId);
      console.log("id", menuList);
      if (menuList[0].id) menuHandler(id, menuList[0].component);
    }
  }, []);

  //Build Menu items
  const buildMenu = () => {
    return menuList.map((menuItem, index) => {
      return (
        <div className="" key={index}>
          {/* <span className="ml-5 text-xs font-semibold tracking-widest text-stoneGray">
                  
                </span> */}
          <Button
            customCssProps="font-medium text-sm"
            key={menuItem.id}
            buttonId={menuItem.id}
            type={"button"}
            colorScheme={"white"}
            variant={"ghost"}
            padding={"normal"}
            radius={"rightFull"}
            component={menuItem.component}
            lightIcon
            isActive={currentSelectedMenu === menuItem.id}
            fullWidth
            onMenuClick={menuHandler}
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
    </>
  );
};

export default Sidebar;
