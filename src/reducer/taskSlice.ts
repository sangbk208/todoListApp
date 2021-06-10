import { createSlice } from "@reduxjs/toolkit";
import { uniqueID } from "../helper/createId";
import _ from 'lodash';
import { getIndex } from "../helper/getIndex";

const initialState: any = {
  tasks: [],
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state, action) =>{
        state.tasks = [...state.tasks, {...action.payload, id: uniqueID()}];
    },
    editTask: (state, action) =>{
      state.tasks[getIndex(state.tasks, action.payload.id)] = action.payload;
    },
    deleteTask: (state, action) =>{
      state.tasks.splice(getIndex(state.tasks, action.payload.id), 1);
    }
  }
});



export const { addTask, editTask, deleteTask} = taskSlice.actions;
export const taskReducer = taskSlice.reducer;