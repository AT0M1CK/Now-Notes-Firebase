import { Note } from "../Layout/MainLayout";

const NoteItem = (props: { notes: Note[] }) => {
  return (
    <>
      {props.notes.map((note) => {
        return (
          <div
            key={note.id}
            className="flex p-2 m-2 flex-col justify-center "
            style={{ backgroundColor: note.config.color }}
          >
            <div className="flex py-2 font-medium">{note.content.header}</div>
            <div className="flex font-base">
              {note.content.body.bodyContent}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default NoteItem;
