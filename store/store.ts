import { configureStore } from "@reduxjs/toolkit";
import catalogPageReducer from "./reducers/catalogPageSlice";

export const store = configureStore({
  reducer: {
    catalogPage: catalogPageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
