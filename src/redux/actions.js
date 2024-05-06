import { createAction } from "@reduxjs/toolkit";

export const addJobs = createAction('ADD_JOBS');
export const addTotalPages = createAction('ADD_TOTAL_PAGES');
export const updateFilterOptions = createAction('UPDATE_FILTER_OPTIONS')