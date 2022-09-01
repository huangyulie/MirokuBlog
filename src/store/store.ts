import { configureStore } from "@reduxjs/toolkit";
import todolist from "./reducers/todolist";

const store = configureStore({
    reducer:{
        todolist
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store