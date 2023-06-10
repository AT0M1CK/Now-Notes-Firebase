import { MdRefresh } from "react-icons/md";
import { Note } from "../Layout/MainLayout";
import Button from "./Button";

const NoteItem = (props: Note) => {
  return (
    <>
      <div
        className="flex w-64 border border-gray-200 hover:shadow-md py-2 px-3 m-2 flex-col rounded-md justify-center"
        style={{ backgroundColor: props.config.color }}
      >
        <div className="flex py-2 font-medium">{props.content.header}</div>
        <div className="flex text-gray-800 pb-1 font-base">
          {props.content.body.bodyContent}
        </div>
        <div className="mt-1 ">
          <Button
            customCssProps=" text-gray-600 "
            type="button"
            colorScheme="white"
            radius="full"
            variant="ghost"
            padding="rounded"
            buttonSize="xs"
            iconOnly
            icon={<MdRefresh size={18} />}
          ></Button>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
