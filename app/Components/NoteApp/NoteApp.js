"use client";

import { useEffect, useState } from "react";
import Todo from "../Todo";
import icons from "../../icons";
import FlipMove from "react-flip-move";
import { useDispatch, useSelector } from "react-redux";
import {
  addNote,
  delNote,
  selectNotes,
  updateANote,
  updateDispatchNoteStatus,
} from "../../features/noteSlice";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "../Sidebar";

const NoteApp = () => {
  const [todo, setTodo] = useState("");
  const [updateATodo, setUpdateATodo] = useState("");
  const [selectedIndex, setSelectedIndex] = useState();
  const [isPopUpActive, setIsPopUpActive] = useState(false);
  const dispatch = useDispatch();
  const notesList = useSelector(selectNotes);
  const [TempNoteList, setTempNoteList] = useState(notesList);
  const [AllActive, setAllActive] = useState(true);
  const [ActiveActive, setActive] = useState(false);
  const [CompletedActive, setCompletedActive] = useState(false);

  useEffect(() => setTempNoteList(notesList), [notesList]);

  const addTodo = (e) => {
    e.preventDefault();
    dispatch(
      addNote({
        id: uuidv4(),
        status: false,
        todo: todo,
      })
    );
    setAllActive(true);
    AllNotes();
    setCompletedActive(false);
    setActive(false);
    setTodo("");
  };

  const deleteTodo = (id) => {
    const index = TempNoteList.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      dispatch(delNote(index));
    }
  };

  const updateTodo = (id) => {
    const index = TempNoteList.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      setIsPopUpActive(true);
      setSelectedIndex(index);
    }
  };

  const updateNoteStatus = (id) => {
    const index = notesList.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      dispatch(updateDispatchNoteStatus(index));
    }
  };

  const updateSelectedTodo = (e) => {
    e.preventDefault();

    dispatch(
      updateANote({
        visibility: false,
        todo: updateATodo,
        indexValue: selectedIndex,
      })
    );
    setUpdateATodo("");
    setIsPopUpActive(false);
  };

  const AllNotes = () => {
    setTempNoteList(notesList);
    setAllActive(true);
    setCompletedActive(false);
    setActive(false);
  };

  const ActiveNotes = () => {
    setAllActive(false);
    setCompletedActive(false);
    setActive(true);
    setTempNoteList(notesList.filter((note) => note.status === false));
  };

  const CompletedNotes = () => {
    setCompletedActive(true);
    setAllActive(false);
    setActive(false);

    setTempNoteList(notesList.filter((note) => note.status === true));
  };

  const customEnterAnimation = {
    from: { transform: "translateY(-100%)" },
    to: { transform: "translateY(0)" },
  };

  return (
    <div className="bg-black-task-0 text-white min-h-screen flex">
      {/* Filter by status */}
      <Sidebar
        AllActive={AllActive}
        AllNotes={AllNotes}
        ActiveActive={ActiveActive}
        ActiveNotes={ActiveNotes}
        CompletedActive={CompletedActive}
        CompletedNotes={CompletedNotes}
      />
      <div className="flex-1 py-3 px-4">
        <div className="flex justify-between items-center">
          <form className="p-2 w-full">
            <input
              placeholder="Write a task"
              className="w-1/2 px-2 py-3 rounded-sm border-b border-gray-200 bg-transparent outline-none text-sm"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
            <button
              type="submit"
              onClick={addTodo}
              className="bg-green-950 text-white px-6 py-3 h-fit rounded-md ml-3 gap-x-4 items-center hidden" //inline-flex
            >
              {icons.add2()}
            </button>
          </form>
        </div>

        <FlipMove
          className="p-5 bg-slate-100"
          typeName={null}
          enterAnimation={customEnterAnimation}
        >
          {TempNoteList?.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo.todo}
              selectedIndex={todo.id}
              updateNoteStatus={() => updateNoteStatus(todo.id)}
              updateTodo={() => updateTodo(todo.id)}
              deleteTodo={() => deleteTodo(todo.id)}
            />
          ))}
        </FlipMove>
      </div>

      {isPopUpActive && (
        <div className="fixed  w-full h-screen bg-filter left-0 -top-0 z-[9999] ">
          <div className="h-full flex justify-center items-center ">
            <div className="bg-white rounded-xl px-10 py-7 relative">
              <div
                className="text-lg rounded-full p-2 flex h-fit items-center cursor-pointer justify-center bg-[#EB4335] font-bold absolute right-4 top-5"
                onClick={() => setIsPopUpActive(false)}
              >
                <icons.close />
              </div>
              <div className="flex justify-between gap-x-5 items-center">
                <form className="p-2 w-full inline-flex gap-x-2 items-center mt-5">
                  <input
                    placeholder="update this todo"
                    className="w-full px-2 py-3 rounded-md outline-none border-gray-900 border-b text-gray-600"
                    value={updateATodo}
                    onChange={(e) => setUpdateATodo(e.target.value)}
                  />
                  <button
                    type="submit"
                    onClick={updateSelectedTodo}
                    className=" "
                  >
                    {icons.done()}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteApp;
