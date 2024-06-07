import React, { forwardRef, useEffect, useState } from "react";
import icons from "../../icons";
import { useSelector } from "react-redux";
import { selectNotes } from "../../features/noteSlice";

// eslint-disable-next-line react/display-name
const Todos = forwardRef(
  ({ todo, updateTodo, deleteTodo, updateNoteStatus, selectedIndex }, ref) => {
    const NoteStatus = useSelector(selectNotes);
    const [targetedIndex, setTargetedIndex] = useState();

    useEffect(() => {
      checker();
    }, []);

    const checker = () => {
      const index = NoteStatus.findIndex((todo) => todo.id === selectedIndex);

      if (index !== -1) {
        updateNoteStatus(index);
        setTargetedIndex(index);
      }
    };

    return (
      <div
        ref={ref}
        className="flex items-center justify-between space-x-2 my-3 border border-[#686464] md:w-1/2 w-full p-3 rounded-md"
      >
        <div className="flex space-x-3 items-center">
          <p onClick={() => checker()}>
            {NoteStatus[targetedIndex]?.status !== undefined &&
            NoteStatus[targetedIndex].status ? (
              <span className="cursor-pointer">
                <icons.done />
              </span>
            ) : (
              <span className="cursor-pointer">
                <icons.ongoing />
              </span>
            )}
          </p>
          <p
            className={`${
              NoteStatus[targetedIndex]?.status !== undefined &&
              NoteStatus[targetedIndex].status &&
              "line-through"
            } text-sm`}
          >
            {todo}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            type="submit"
            onClick={updateTodo}
            className="bg-green-950 text-white p-2 h-fit rounded-md ml-3"
          >
            {icons.edit()}
          </button>
          <button
            type="submit"
            onClick={deleteTodo}
            className="bg-red-800 text-white p-2 h-fit rounded-md ml-3"
          >
            {icons.del()}
          </button>
        </div>
      </div>
    );
  }
);

export default Todos;
