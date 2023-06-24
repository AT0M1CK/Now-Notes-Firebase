import { Note } from "../Layout/MainLayout";
import NoteItem from "./NoteItem";

const NoteList = (props: { notes: Note[] }) => {
  return (
    <>
      {props.notes.map((note) => {
        return <NoteItem key={note.id} SingleNote={note} />;
      })}
    </>
  );
};

export default NoteList;
