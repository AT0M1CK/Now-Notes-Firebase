import { Note } from "../Layout/MainLayout";

const NoteItem = (props: Note) => {
  return (
    <>
      <div
        className="flex p-2 m-2 flex-col rounded-md justify-center "
        style={{ backgroundColor: props.config.color }}
      >
        <div className="flex py-2 font-medium">{props.content.header}</div>
        <div className="flex font-base">{props.content.body.bodyContent}</div>
      </div>
    </>
  );
};

export default NoteItem;
