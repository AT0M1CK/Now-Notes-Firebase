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
import { NoteManagerActivePath, remotePath } from "../../utils/utils";
import NoteMaker from "../NoteMaker";

export type MenuItem = {
  id: number;
  title: string;
  icon: ReactNode;
  component?: ReactNode;
};

export enum NoteManagerState {
  ACTIVE,
  ARCHIVE,
  TRASH,
}

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

  const [currentNoteManagerState, setCurrentNoteManagerState] =
    useState<NoteManagerState>(NoteManagerState.ACTIVE);

  const [currentActivePath, setCurrentActivePath] =
    useState<NoteManagerActivePath>({
      name: "ACTIVE",
      path: remotePath.active,
    });

  const titleSetter = (title: string) => {
    setHeaderTitle(title);
  };

  const noteManagerStateChangeHandler = (newState: NoteManagerState) => {
    setCurrentNoteManagerState(newState);
    console.log(currentNoteManagerState);
  };

  const noteManagerActivePathHandler = (newState: NoteManagerActivePath) => {
    setCurrentActivePath(newState);
  };

  const menuIconSize = 24;
  // Menu List
  const menuList: MenuItem[] = [
    {
      id: 0,
      title: "Notes",
      icon: <MdLightbulbOutline size={menuIconSize} />,
    },
    {
      id: 1,
      title: "Reminders",
      icon: <MdOutlineNotifications size={menuIconSize} />,
    },
    {
      id: 2,
      title: "Edit Labels",
      icon: <TbEdit size={menuIconSize} />,
    },
    {
      id: 3,
      title: "Archive",
      icon: <TbArchive size={menuIconSize} />,
    },
    {
      id: 4,
      title: "Trash",
      icon: <MdDeleteOutline size={menuIconSize} />,
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
                <NoteManager activePath={currentActivePath} />
                {/* <NoteMaker /> */}
              </div>
            </main>

            <nav className="order-first flex-none pt-2 sm:w-72 bg-white">
              <Sidebar
                menuList={menuList}
                activePathChangeHandler={noteManagerActivePathHandler}
                stateChangeHandler={noteManagerStateChangeHandler}
                selectHandler={titleSetter}
              />
            </nav>
          </div>
        </div>
      </MainContext.Provider>
    </>
  );
};

export default MainLayout;
