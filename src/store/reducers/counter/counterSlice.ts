import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CounterState{
    value: number;
}

const initialState: CounterState = {
    value: 0,
};

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers:{
        increment: (state: CounterState) =>{
            state.value += 1;
        },
        decrement: (state: CounterState)=>{
            state.value -= 1;
        },
        incrementByAmount: (state: CounterState,action: PayloadAction<number>) =>{
            state.value += action.payload;
        }
    }
});

export const { increment , decrement , incrementByAmount} = counterSlice.actions;

export default counterSlice.reducer;