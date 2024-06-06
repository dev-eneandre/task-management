"use client";
import NoteApp from "./Components/NoteApp/NoteApp";
import { Provider } from "react-redux";
import store from "../app/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const Home = () => {
  let persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NoteApp />
      </PersistGate>
    </Provider>
  );
};

export default Home;
