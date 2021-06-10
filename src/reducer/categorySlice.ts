import { createSlice } from "@reduxjs/toolkit";
import _ from 'lodash';

const initialState: any = {
    categories: ['To-do', 'Completed'],
    absentCategory: ['Pending', 'Failed'],
};

const categorySlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addCategory: (state, action) => {
        state.categories = [...state.categories, action.payload];
        state.absentCategory = state.absentCategory.filter((item:string)=> item!==action.payload);
    },
    deleteCategory: (state, action) =>{
        state.absentCategory = [...state.absentCategory, action.payload];
        state.categories = state.categories.filter((item:string)=> item!==action.payload);
    }
  }
});

export const { addCategory, deleteCategory} = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;