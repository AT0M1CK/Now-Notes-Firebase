import { ReactNode } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import {
  MdArchive,
  MdDelete,
  MdFileCopy,
  MdLabel,
  MdNotifications,
} from "react-icons/md";

export type MenuItem = {
  id: number;
  title: string;
  icon: ReactNode;
};

const MainLayout = () => {
  const menuIconSize = 25;
  // Menu List
  const menuList: MenuItem[] = [
    { id: 0, title: "Notes", icon: <MdFileCopy size={menuIconSize} /> },
    {
      id: 1,
      title: "Reminders",
      icon: <MdNotifications size={menuIconSize} />,
    },
    { id: 2, title: "Labels", icon: <MdLabel size={menuIconSize} /> },
    { id: 3, title: "Archive", icon: <MdArchive size={menuIconSize} /> },
    { id: 4, title: "Trash", icon: <MdDelete size={menuIconSize} /> },
  ];

  return (
    <>
      <div className="min-h-screen font-inter flex flex-col">
        <header className="border border-divider">
          <Header />
        </header>

        <div className="flex-1 flex flex-col sm:flex-row">
          <main className="flex-1 bg-white"></main>

          <nav className="order-first sm:w-72 bg-white">
            <Sidebar menuList={menuList} />
          </nav>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
