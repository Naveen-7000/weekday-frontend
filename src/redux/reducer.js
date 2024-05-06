import { combineReducers } from "@reduxjs/toolkit";
import jobsReducer from "./jobReducer";
import filtersReducer from "./filterReducer"; 
const rootReducer = combineReducers({
  jobs: jobsReducer,
  filters: filtersReducer,
});

export default rootReducer;
