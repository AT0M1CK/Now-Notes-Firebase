import { ReactNode, useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar";
import {
  MdDeleteOutline,
  MdOutlineNotifications,
  MdLightbulbOutline,
} from "react-icons/md";
import { TbArchive, TbEdit } from "react-icons/tb";
import { MainContext } from "../Contexts/MainContext";

import NoteManager from "../UI/NoteManager";
import LabelEditor from "../LabelEditor";
import TrashManager from "../TrashManager";
import ArchiveManager from "../ArchiveManager";
import RemindersManager from "../RemindersManager";

export type MenuItem = {
  id: number;
  title: string;
  icon: ReactNode;
  component?: ReactNode;
};

export type Note = {
  id: string;
  content: {
    header: string;
    body: {
      bodyType: "task" | "plain";
      bodyContent: string;
    };
  };
  config: {
    color: string;
  };
};

const MainLayout = () => {
  const [headerTitle, setHeaderTitle] = useState("Now Notes");
  const [currentComponent, setCurrentComponent] = useState<ReactNode>(
    <NoteManager />
  );

  const titleSetter = (title: string) => {
    setHeaderTitle(title);
  };

  const activeComponentHandler = (component: ReactNode) => {
    setCurrentComponent(component);
    console.log("currentComponent", currentComponent);
  };

  const menuIconSize = 24;
  // Menu List
  const menuList: MenuItem[] = [
    {
      id: 0,
      title: "Notes",
      icon: <MdLightbulbOutline size={menuIconSize} />,
      component: <NoteManager />,
    },
    {
      id: 1,
      title: "Reminders",
      icon: <MdOutlineNotifications size={menuIconSize} />,
      component: <RemindersManager />,
    },
    {
      id: 2,
      title: "Edit Labels",
      icon: <TbEdit size={menuIconSize} />,
      component: <LabelEditor />,
    },
    {
      id: 3,
      title: "Archive",
      icon: <TbArchive size={menuIconSize} />,
      component: <ArchiveManager />,
    },
    {
      id: 4,
      title: "Trash",
      icon: <MdDeleteOutline size={menuIconSize} />,
      component: <TrashManager />,
    },
  ];

  return (
    <>
      <MainContext.Provider
        value={{ title: headerTitle, setTitle: titleSetter }}
      >
        <div className="min-h-screen h-screen font-inter flex flex-col">
          <header className="border border-divider sticky top-0 ">
            <Header />
          </header>

          <div className="flex-1 flex flex-col overflow-y-hidden sm:flex-row">
            <main className="flex-1 min-w-0 overflow-y-auto bg-white m-2">
              <div className="flex flex-col  m-3">
                {/* <NoteCreator /> */}
                {currentComponent}
              </div>
            </main>

            <nav className="order-first flex-none pt-2 sm:w-72 bg-white">
              <Sidebar
                menuList={menuList}
                selectHandler={activeComponentHandler}
              />
            </nav>
          </div>
        </div>
      </MainContext.Provider>
    </>
  );
};

export default MainLayout;
