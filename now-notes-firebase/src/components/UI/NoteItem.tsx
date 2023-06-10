import {
  MdMoreVert,
  MdOutlineArchive,
  MdOutlineImage,
  MdRefresh,
} from "react-icons/md";
import { Note } from "../Layout/MainLayout";
import Button from "./Button";
import { ReactNode } from "react";
import { TbBellPlus, TbPalette, TbPinned, TbUserPlus } from "react-icons/tb";

export type ActionsButtonType = {
  id: number;
  icon: ReactNode;
  actionCallback?: () => void;
};

const NoteItem = (props: Note) => {
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
    },
  ];

  //Build actions panel
  const buildActionsList = () => {
    return actionsList.map((action) => {
      return (
        <Button
          key={action.id}
          customCssProps=" text-gray-600 "
          type="button"
          colorScheme="white"
          radius="full"
          variant="ghost"
          padding="rounded"
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
        </div>
      </div>
    </>
  );
};

export default NoteItem;
