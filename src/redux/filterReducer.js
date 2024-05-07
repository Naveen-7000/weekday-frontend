import { createReducer } from "@reduxjs/toolkit";
import { updateFilterOptions } from "./actions";

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

// so here this reducer is to add filters and updated values based on filter types
const filtersReducer = createReducer(initialState, (builder) => {
  builder.addCase(updateFilterOptions, (state, action) => {
    const { filterType, options } = action.payload;
    state.filters[filterType] = options;
  });
});

export default filtersReducer;
