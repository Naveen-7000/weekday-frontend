// reducers/filtersReducer.js

import { createReducer } from "@reduxjs/toolkit";
import { updateFilterOptions } from "./actions"; // Assuming you have an action creator for updating filter options

// Define initial state for filters
const initialState = {
  filters: {
    roles: [],
    employees: [],
    experience: [],
    remote: [],
    minBasePay: [],
    companyName: [],
    techStacks: [],
  },
};

// Create a reducer function to handle filter actions
const filtersReducer = createReducer(initialState, (builder) => {
  builder.addCase(updateFilterOptions, (state, action) => {
    const { filterType, options } = action.payload;
    // Update filter options based on filterType
    state.filters[filterType] = options;
  });
});

export default filtersReducer;
