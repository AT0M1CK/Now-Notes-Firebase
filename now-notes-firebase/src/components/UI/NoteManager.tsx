import { useEffect, useState } from "react";
import TextInput from "./TextInput";
import { useForm } from "react-hook-form";
import { Note, NoteManagerState } from "../Layout/MainLayout";
import NoteList from "./NoteList";
import { ref, push, set, get, child, remove, update } from "firebase/database";
import { auth, database } from "../../firebase/firebaseConfig";
import { NoteCreatorContext } from "../Contexts/NoteCreatorContext";
import { NoteManagerActivePath, remotePath } from "../../utils/utils";

import { MdMoreVert, MdOutlineArchive, MdOutlineImage } from "react-icons/md";
import { TbBellPlus, TbPalette, TbUserPlus } from "react-icons/tb";
import { Menu } from "@headlessui/react";

import Button from "./Button";
import ActionPanel from "./ActionPanel";

const NoteManager = (props: { activePath: NoteManagerActivePath }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [notesList, setNotesList] = useState<Note[]>([]);
  const [isBackdropActive, setIsBackdropActive] = useState(false);

  // const [archiveNotesList, setArchiveNotesList] = useState<Note[]>([]);
  // const [userId, setUserId] = useState("");

  const { activePath } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  //   const noteList: Note[] = [
  //     {
  //       id: 1,
  //       content: {
  //         header: "Note 1",
  //         body: {
  //           bodyType: "plain",
  //           bodyContent: "Welcome to my first note",
  //         },
  //       },
  //       config: {
  //         color: "#bebebe",
  //       },
  //     },
  //     {
  //       id: 2,
  //       content: {
  //         header: "Note 2",
  //         body: {
  //           bodyType: "plain",
  //           bodyContent: "Welcome to my second note",
  //         },
  //       },
  //       config: {
  //         color: "#bebebe",
  //       },
  //     },
  //   ];

  // const creatorButtonList: ActionsButtonType[] = [
  //   {
  //     id: 0,
  //     icon: <TbBellPlus size={18} />,
  //   },
  //   {
  //     id: 1,
  //     icon: <TbUserPlus size={18} />,
  //   },
  //   {
  //     id: 2,
  //     icon: <TbPalette size={18} />,
  //   },
  //   {
  //     id: 3,
  //     icon: <MdOutlineImage size={18} />,
  //   },
  //   {
  //     id: 4,
  //     icon: <MdOutlineArchive size={18} />,
  //   },
  //   {
  //     id: 5,
  //     icon: <MdMoreVert size={18} />,
  //   },
  // ];
  // const buildCreatorButtonList = () => {
  //   return creatorButtonList.map((button) => {
  //     if (button.id === 2)
  //       return (
  //         <Menu
  //           key={button.id}
  //           as="div"
  //           className="relative inline-block text-left"
  //         >
  //           <Menu.Button className="flex p-2 hover:bg-gray-200 rounded-full">
  //             <TbPalette size={18} />
  //             {/* <Button
  //               customCssProps=" text-gray-600 "
  //               type="button"
  //               colorScheme="white"
  //               radius="full"
  //               variant="ghost"
  //               padding="rounded"
  //               onClick={action.actionCallback}
  //               buttonSize="xs"
  //               iconOnly
  //               icon={action.icon}
  //             ></Button> */}
  //           </Menu.Button>
  //           <Menu.Items>
  //             <Menu.Item as="div" className="absolute">
  //               {/* <ColorSelector
  //                 noteId={props.id}
  //                 noteColor={props.config.color}
  //               /> */}
  //             </Menu.Item>
  //           </Menu.Items>
  //         </Menu>
  //       );
  //     return (
  //       <Button
  //         key={button.id}
  //         customCssProps=" text-gray-600 "
  //         type="button"
  //         colorScheme="white"
  //         radius="full"
  //         variant="ghost"
  //         padding="rounded"
  //         onClick={button.actionCallback}
  //         buttonSize="xs"
  //         iconOnly
  //         icon={button.icon}
  //       ></Button>
  //     );
  //   });
  // };

  const getNoteById = (id: string) => {
    let selectedNote = {} as Note;
    const notesListCopy = [...notesList];
    notesListCopy.forEach((note) => {
      if (note.id === id) {
        selectedNote = note;
      }
    });
    return { note: selectedNote, notesListCopy };
  };

  const colorChangeHandler = (id: string, color: string) => {
    const { note, notesListCopy } = getNoteById(id);

    note.config.color = color;
    setNotesList(notesListCopy);
    const noteRef = ref(database, `/Notes/active/${note.id}`);
    update(noteRef, note);
  };

  const createNote = (header: string, description: string) => {
    const note: Note = {
      id: Math.random().toString(),
      content: {
        header: header,
        body: {
          bodyType: "plain",
          bodyContent: description,
        },
      },
      config: {
        color: "#ebd50e",
      },
    };
    setNotesList([...notesList, note]);
    // const path = "/" + userId + activePath.path;
    // console.log("path", path);

    const noteListRef = ref(database, activePath.path);
    const newNoteRef = push(noteListRef);
    note.id = newNoteRef.key!;
    console.log(newNoteRef.key);
    set(newNoteRef, note);
  };

  //Add note to archive
  // const archiveLocalNote = (id: string) => {
  //   const noteListCopy = [...notesList];
  //   noteListCopy.forEach((note) => {
  //     if (note.id === id) {
  //       setArchiveNotesList([...archiveNotesList, note]);
  //       console.log(archiveNotesList);
  //     }
  //   });
  // };

  //Archive single note from databse
  const archiveSingleNote = (id: string) => {
    const notesListCopy = [...notesList];
    notesListCopy.forEach((note) => {
      if (note.id === id) {
        const noteCopy = Object.assign({}, note);
        const noteArchiveRef = ref(database, remotePath.archive);
        const newArchiveRef = push(noteArchiveRef);
        noteCopy.id = newArchiveRef.key!;
        console.log(newArchiveRef.key);
        set(newArchiveRef, noteCopy).then(() => {
          deleteSingleNote(id);
        });
      }
    });
  };

  const trashSingleNote = (id: string) => {
    const notesListCopy = [...notesList];
    notesListCopy.forEach((note) => {
      if (note.id === id) {
        const noteCopy = Object.assign({}, note);
        const noteArchiveRef = ref(database, remotePath.trash);
        const newArchiveRef = push(noteArchiveRef);
        noteCopy.id = newArchiveRef.key!;
        console.log(newArchiveRef.key);
        set(newArchiveRef, noteCopy).then(() => {
          deleteSingleNote(id);
        });
      }
    });
  };

  //Delete note from local notes list
  const deleteLocalNote = (id: string) => {
    const notesListCopy = [...notesList];
    notesListCopy.forEach((note, index) => {
      if (note.id === id) {
        notesListCopy.splice(index, 1);
        setNotesList(notesListCopy);
      }
    });
  };

  //Update notes
  //Delete signle note
  const deleteSingleNote = async (id: string) => {
    const noteDeleteRef = ref(database, `/Notes/active/${id}`);
    try {
      await remove(noteDeleteRef);
      console.log("id:", id);
      deleteLocalNote(id);
    } catch (error) {
      console.log("Cannot delete note...");
    }
  };

  // const writeUserData = (header: string, description: string) => {
  //   set(ref(database, "/Notes"), {
  //     header: header,
  //     description: description,
  //   });
  // };

  const onFormSubmit = (data: any) => {
    console.log(data);
    console.log("onBlur fired!");
    if (data.header || data.body) {
      createNote(data.header, data.body);
    }

    setValue("header", "");
    setValue("body", "");
    setIsCreating(false);
    // writeUserData(data.header, data.body);
  };

  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, activePath.path)).then((snapshot) => {
      if (snapshot.exists()) {
        const activeNotes = Object.values(snapshot.val());
        console.log(snapshot.val());
        setNotesList(activeNotes as Note[]);
      }
    });
  }, [activePath]);

  // useEffect(() => {
  //   const user = auth.currentUser;
  //   if (auth.currentUser) setUserId(auth.currentUser?.uid);
  //   console.log("user", user);
  // }, [auth.currentUser]);

  return (
    <>
      <NoteCreatorContext.Provider
        value={{
          deleteNote: deleteSingleNote,
          changeColor: colorChangeHandler,
          archiveNote: archiveSingleNote,
          trashNote: trashSingleNote,
        }}
      >
        <div className="flex justify-center">
          <form
            onSubmit={handleSubmit(onFormSubmit)}
            onBlur={handleSubmit(onFormSubmit)}
          >
            {activePath.name === "ACTIVE" && (
              <div
                className={`md:w-128 sm:w-96 flex flex-col mb-3 justify-center px-4 py-3 rounded-md  shadow-md shadow-gray-400 border`}
              >
                <div className="flex ">
                  {!isCreating && (
                    <div
                      className="flex justify-start font-medium"
                      onClick={() => {
                        setIsCreating(true);
                      }}
                    >
                      Create Note...
                    </div>
                  )}
                  {isCreating && (
                    <div className="w-full">
                      <TextInput
                        type="text"
                        colorScheme="white"
                        rounded="md"
                        size="xs"
                        placeHolder="Title"
                        borderScheme="white"
                        register={register}
                        error={errors}
                        name="header"
                        isNoteInput={true}
                        validationSchema={{
                          required: false,
                          // pattern:
                          //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                          patternError: "",
                          requiredError: "empty",
                        }}
                      />
                      <TextInput
                        type="text"
                        colorScheme="white"
                        rounded="md"
                        size="xs"
                        placeHolder="Description"
                        borderScheme="white"
                        register={register}
                        error={errors}
                        name="body"
                        isNoteInput={true}
                        validationSchema={{
                          required: false,
                          // pattern:
                          //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                          patternError: "Invalid password.",
                          requiredError: "empty",
                        }}
                      />
                      <div className="flex justify-between">
                        <button type="submit" className="">
                          Submit
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </form>
        </div>
        <div className="flex flex-wrap">
          <NoteList notes={notesList} />
        </div>
      </NoteCreatorContext.Provider>
    </>
  );
};

export default NoteManager;
