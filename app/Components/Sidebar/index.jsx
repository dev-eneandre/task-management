import React from "react";

const index = ({
  AllNotes,
  AllActive,
  ActiveNotes,
  ActiveActive,
  CompletedActive,
  CompletedNotes,
}) => {
  return (
    <div className="bg-black-task-1 flex-[0.3] flex flex-col space-y-3 items-start text-white py-4 ">
      <h2 className="text-xl w-full text-center">Task Management</h2>
      <div className="border-b border-gray-400 w-full"></div>
      <button
        className={`bg-transparent hover:bg-[rgb(0,0,0,0.1)] px-4 py-2 h-fit rounded-tr-2xl rounded-br-2xl w-full ${
          AllActive && "!bg-cyan-600 "
        }`}
        onClick={AllNotes}
      >
        All
      </button>
      <button
        className={`bg-transparent hover:bg-[rgb(0,0,0,0.1)] px-4 py-2 h-fit rounded-tr-2xl rounded-br-2xl w-full ${
          ActiveActive && "!bg-cyan-600 "
        }`}
        onClick={ActiveNotes}
      >
        Active
      </button>
      <button
        className={`bg-transparent hover:bg-[rgb(0,0,0,0.1)] px-4 py-2 h-fit rounded-tr-2xl rounded-br-2xl w-full ${
          CompletedActive && "!bg-cyan-600 "
        }`}
        onClick={CompletedNotes}
      >
        Completed
      </button>
    </div>
  );
};

export default index;
