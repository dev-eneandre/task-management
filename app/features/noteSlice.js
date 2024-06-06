import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";

export const noteSlice = createSlice({
  name: "note",
  initialState: {
    list: [],
  },
  reducers: {
    addNote: (state, action) => {
      state.list = [...state.list, action.payload];
    },
    delNote: (state, action) => {
      state.list.splice(action.payload, 1);
    },
    updateANote: (state, action) => {
      const getPayLoad = action.payload.indexValue;
      const removeKey = (obj, keyToRemove) => {
        return Object.fromEntries(
          Object.entries(obj).filter(([key]) => key !== keyToRemove)
        );
      };

      const newObj = removeKey(action.payload, "indexValue");
      state.list.splice(getPayLoad, 1, newObj);
    },
    updateDispatchNoteStatus: (state, action) => {
      const getNoteStatusIndex = action.payload;
      if (state.list[getNoteStatusIndex]) {
        state.list[getNoteStatusIndex].status =
          !state.list[getNoteStatusIndex].status;
      }
    },
  },
});

export const { addNote, delNote, updateANote, updateDispatchNoteStatus } =
  noteSlice.actions;

export const selectNotes = (state) => state.note.list;

export default noteSlice.reducer;
