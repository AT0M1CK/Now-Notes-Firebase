import React, { ReactNode, useContext } from "react";
import { MdMoreVert, MdOutlineArchive, MdOutlineImage } from "react-icons/md";
import { TbBellPlus, TbPalette, TbUserPlus } from "react-icons/tb";
import { NoteCreatorContext } from "../Contexts/NoteCreatorContext";
import { Note } from "../Layout/MainLayout";
import Button from "./Button";
import { Menu } from "@headlessui/react";
import ColorSelector from "../ColorSelector";

export type ActionsButtonType = {
  id: number;
  icon: ReactNode;
  actionCallback?: () => void;
};

const ActionPanel = (props: Note) => {
  const { archiveNote, trashNote } = useContext(NoteCreatorContext);
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
      actionCallback: () => {
        if (archiveNote) archiveNote(props.id);
      },
    },
    {
      id: 5,
      icon: <MdMoreVert size={18} />,
      actionCallback: () => {
        if (trashNote) trashNote(props.id);
      },
    },
  ];

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
  return <>{buildActionsList()}</>;
};

export default ActionPanel;
