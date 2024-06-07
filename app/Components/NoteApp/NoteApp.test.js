import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import NoteApp from "./NoteApp";
import {
  addNote,
  delNote,
  updateDispatchNoteStatus,
} from "../../features/noteSlice";

jest.mock("uuid", () => ({
  v4: jest.fn(() => "unique-id"),
}));

const mockStore = configureStore([]);

describe("NoteApp Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      notes: [],
    });

    store.dispatch = jest.fn();
  });

  test("renders NoteApp component", () => {
    render(
      <Provider store={store}>
        <NoteApp />
      </Provider>
    );

    expect(screen.getByPlaceholderText("Write a task")).toBeInTheDocument();
  });

  test("adds a new todo", () => {
    render(
      <Provider store={store}>
        <NoteApp />
      </Provider>
    );

    const input = screen.getByPlaceholderText("Write a task");
    const button = screen.getByRole("button", { name: /add2/i });

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(button);

    expect(store.dispatch).toHaveBeenCalledWith(
      addNote({
        id: "unique-id",
        status: false,
        todo: "New Task",
      })
    );
  });

  test("deletes a todo", () => {
    store = mockStore({
      notes: [{ id: "unique-id", status: false, todo: "Task to Delete" }],
    });

    render(
      <Provider store={store}>
        <NoteApp />
      </Provider>
    );

    const deleteButton = screen.getByRole("button", { name: /delete/i });

    fireEvent.click(deleteButton);

    expect(store.dispatch).toHaveBeenCalledWith(delNote(0));
  });

  test("updates a todo status", () => {
    store = mockStore({
      notes: [
        { id: "unique-id", status: false, todo: "Task to Update Status" },
      ],
    });

    render(
      <Provider store={store}>
        <NoteApp />
      </Provider>
    );

    const updateStatusButton = screen.getByRole("button", {
      name: /update-status/i,
    });

    fireEvent.click(updateStatusButton);

    expect(store.dispatch).toHaveBeenCalledWith(updateDispatchNoteStatus(0));
  });

  test("filters active and completed todos", () => {
    store = mockStore({
      notes: [
        { id: "unique-id-1", status: false, todo: "Active Task" },
        { id: "unique-id-2", status: false, todo: "Completed Task" },
      ],
    });

    render(
      <Provider store={store}>
        <NoteApp />
      </Provider>
    );

    const activeFilterButton = screen.getByRole("button", { name: /active/i });
    const completedFilterButton = screen.getByRole("button", {
      name: /completed/i,
    });

    fireEvent.click(activeFilterButton);

    expect(screen.getByText("Active Task")).toBeInTheDocument();
    expect(screen.queryByText("Completed Task")).toBeNull();

    fireEvent.click(completedFilterButton);

    expect(screen.getByText("Completed Task")).toBeInTheDocument();
    expect(screen.queryByText("Active Task")).toBeNull();
  });
});
