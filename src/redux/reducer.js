import { combineReducers } from "@reduxjs/toolkit";
import jobsReducer from "./jobReducer";
import filtersReducer from "./filterReducer";

//  just an extra file we can reduce it to single file itself in store but i did just
// for sepration purpose
const rootReducer = combineReducers({
  jobs: jobsReducer,
  filters: filtersReducer,
});

export default rootReducer;
