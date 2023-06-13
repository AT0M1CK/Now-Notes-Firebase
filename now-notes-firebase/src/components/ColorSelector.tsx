import { useContext, useState } from "react";
import { NoteCreatorContext } from "./Contexts/NoteCreatorContext";

export type colorButtonType = {
  id: string;
  color: string;
};

const ColorSelector = (props: { noteId: string; noteColor: string }) => {
  const { changeColor } = useContext(NoteCreatorContext);
  const [currentSelectedColor, setCurrentSelectedColor] = useState(
    props.noteColor
  );

  const colorButtonList: colorButtonType[] = [
    {
      id: "0",
      color: "#13eb4c",
    },
    {
      id: "1",
      color: "#0e7eed",
    },
    {
      id: "2",
      color: "#ebd50e",
    },
    {
      id: "3",
      color: "#f08930",
    },
    {
      id: "4",
      color: "#1cd9c6",
    },
    {
      id: "5",
      color: "#d98dd6",
    },
  ];

  //   const colorSetter = (color: string) => {
  //     setCurrentSelectedColor(color);
  //     console.log(currentSelectedColor);
  //   };

  //build color buttons
  const buildColorButtons = () => {
    return colorButtonList.map((color) => {
      return (
        <button
          key={color.id}
          onClick={() => {
            if (changeColor) changeColor(props.noteId, color.color);
          }}
          className={`flex m-1 h-10 w-10 hover:border-2 ${
            currentSelectedColor === color.color && "ring-2"
          } hover:border-gray-700 rounded-full`}
          style={{ backgroundColor: color.color }}
        />
      );
    });
  };

  return (
    <>
      <div className="flex flex-wrap h-32 w-64 bg-slate-200 rounded-md p-2 m-2">
        {buildColorButtons()}
      </div>
    </>
  );
};

export default ColorSelector;
