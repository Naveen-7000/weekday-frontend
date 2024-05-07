import {createReducer } from "@reduxjs/toolkit";
import { addJobs, addTotalPages } from "./actions";

const initialState = {
    jobs: [],
    totalPages:0,
}

//  this reducer will handle all the state interaction of jobs
//  here addJobs is action that will handle adding jobs after every fetch request
const jobsReducer = createReducer(initialState,(builder)=>{
    builder.addCase(addJobs,(state,action)=>{
        state.jobs = [...state.jobs,...action.payload];
    })
    .addCase(addTotalPages, (state, action) => {
        state.totalPages = action.payload;
    })
})



export default jobsReducer;