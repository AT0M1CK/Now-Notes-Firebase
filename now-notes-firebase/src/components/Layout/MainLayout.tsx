import { ReactNode } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar";
import {
  MdDeleteOutline,
  MdOutlineNotifications,
  MdLightbulbOutline,
} from "react-icons/md";
import { TbArchive, TbEdit } from "react-icons/tb";

export type MenuItem = {
  id: number;
  title: string;
  icon: ReactNode;
};

const MainLayout = () => {
  const menuIconSize = 24;
  // Menu List
  const menuList: MenuItem[] = [
    { id: 0, title: "Notes", icon: <MdLightbulbOutline size={menuIconSize} /> },
    {
      id: 1,
      title: "Reminders",
      icon: <MdOutlineNotifications size={menuIconSize} />,
    },
    { id: 2, title: "Edit Labels", icon: <TbEdit size={menuIconSize} /> },
    { id: 3, title: "Archive", icon: <TbArchive size={menuIconSize} /> },
    { id: 4, title: "Trash", icon: <MdDeleteOutline size={menuIconSize} /> },
  ];

  return (
    <>
      <div className="min-h-screen font-inter flex flex-col">
        <header className="border border-divider">
          <Header />
        </header>

        <div className="flex-1 flex flex-col sm:flex-row">
          <main className="flex-1 bg-white"></main>

          <nav className="order-first pt-2 sm:w-72 bg-white">
            <Sidebar menuList={menuList} />
          </nav>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
