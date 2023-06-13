import { MdMoreVert, MdOutlineArchive, MdOutlineImage } from "react-icons/md";
import { Note } from "../Layout/MainLayout";
import Button from "./Button";
import { ReactNode, useContext } from "react";
import { TbBellPlus, TbPalette, TbPinned, TbUserPlus } from "react-icons/tb";
import { NoteCreatorContext } from "../Contexts/NoteCreatorContext";
import { Menu } from "@headlessui/react";
import ColorSelector from "../ColorSelector";

export type ActionsButtonType = {
  id: number;
  icon: ReactNode;
  actionCallback?: () => void;
};

const NoteItem = (props: Note) => {
  const { deleteNote } = useContext(NoteCreatorContext);

  //Actions Button List
  const actionsList: ActionsButtonType[] = [
    {
      id: 0,
      icon: <TbBellPlus size={18} />,
    },
    {
      id: 1,
      icon: <TbUserPlus size={18} />,
    },
    {
      id: 2,
      icon: <TbPalette size={18} />,
    },
    {
      id: 3,
      icon: <MdOutlineImage size={18} />,
    },
    {
      id: 4,
      icon: <MdOutlineArchive size={18} />,
    },
    {
      id: 5,
      icon: <MdMoreVert size={18} />,
      actionCallback: () => {
        if (deleteNote) deleteNote(props.id);
      },
    },
  ];

  //Build actions panel
  const buildActionsList = () => {
    return actionsList.map((action) => {
      if (action.id === 2)
        return (
          <Menu
            key={action.id}
            as="div"
            className="relative inline-block text-left"
          >
            <Menu.Button className="flex p-2 hover:bg-gray-200 rounded-full">
              <TbPalette size={18} />
              {/* <Button
                customCssProps=" text-gray-600 "
                type="button"
                colorScheme="white"
                radius="full"
                variant="ghost"
                padding="rounded"
                onClick={action.actionCallback}
                buttonSize="xs"
                iconOnly
                icon={action.icon}
              ></Button> */}
            </Menu.Button>
            <Menu.Items>
              <Menu.Item as="div" className="absolute">
                <ColorSelector
                  noteId={props.id}
                  noteColor={props.config.color}
                />
              </Menu.Item>
            </Menu.Items>
          </Menu>
        );
      return (
        <Button
          key={action.id}
          customCssProps=" text-gray-600 "
          type="button"
          colorScheme="white"
          radius="full"
          variant="ghost"
          padding="rounded"
          onClick={action.actionCallback}
          buttonSize="xs"
          iconOnly
          icon={action.icon}
        ></Button>
      );
    });
  };

  return (
    <>
      <div
        className="flex w-64 border border-gray-200 group hover:shadow-md py-2 px-3 m-2 flex-col rounded-md justify-center"
        style={{ backgroundColor: props.config.color }}
      >
        <div className="flex flex-row justify-between items-center align-middle py-2 font-medium">
          <div>{props.content.header}</div>
          <div className="invisible group-hover:visible">
            <Button
              customCssProps=" text-gray-600 "
              type="button"
              colorScheme="white"
              radius="full"
              variant="ghost"
              padding="rounded"
              buttonSize="lg"
              iconOnly
              icon={<TbPinned size={23} />}
            ></Button>
          </div>
        </div>
        <div className="flex text-gray-800 pb-1 font-base">
          {props.content.body.bodyContent}
        </div>
        <div className="flex text-gray-800 pb-1 font-base">
          <span className="border mt-2 mb-0.5 border-gray-400 px-1 bg-gray text-xs rounded-full">
            tags
          </span>
        </div>
        <div className="mt-1 flex justify-between transition group-hover:visible invisible flex-row">
          {buildActionsList()}
          {/* drop down actions */}
        </div>
      </div>
    </>
  );
};

export default NoteItem;
