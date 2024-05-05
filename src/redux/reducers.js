import { combineReducers, createReducer } from "@reduxjs/toolkit";
import { addJobs } from "./actions";

const initialState = [{
    jobs: [],
}]

//  this reducer will handle all the state interaction of jobs
//  here addJobs is action that will handle adding jobs after every fetch request
const jobsReducer = createReducer(initialState,(builder)=>{
    builder.addCase(addJobs,(state,action)=>{
        state.push(action.payload);
    })
}) 


// commbine all reducers into one place for easy debugging and readability
const rootReducer = combineReducers({
    jobs:jobsReducer
})


export default rootReducer;