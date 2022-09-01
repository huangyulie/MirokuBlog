import { createSlice } from "@reduxjs/toolkit";

const initialState= {list:[{thing: "123123",id: 1}]};

export const todoList = createSlice({
    name: "todolist",
    initialState,
    reducers:{
        increment: (state,{payload})=>{
            // state = state.filter((item)=>{
            //     return item.id !== payload.id;
            // })
            state.list = [...state.list,payload]
            // console.log(payload);
            // console.log(state);
            
            
            // state.list = [payload]
        },
        decrement:(state,{payload})=>{
            
        }
    }
})

export const {increment} = todoList.actions;
export default todoList.reducer;