import { createSlice } from '@reduxjs/toolkit'

// Filters Reducer
const filtersReducer = createSlice({
  name: 'filters',
  initialState: {
    text: '',
    sortDescending: true,
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined,
  },
  reducers: {
    // set text filter
    setTextFilter: (state, { payload }) => {
      state.text = payload
    },
    // sort direction
    flipSort: state => {
      state.sortDescending = !state.sortDescending
    },
    // sort by description
    sortByDescription: state => {
      state.sortBy = 'description'
    },
    // sort by date
    sortByDate: state => {
      state.sortBy = 'date'
    },
    // sort by amount
    sortByAmount: state => {
      state.sortBy = 'amount'
    },
    // set start date
    setStartDate: (state, { payload }) => {
      state.startDate = payload
      state.sortBy = 'date'
    },
    // set end date
    setEndDate: (state, { payload }) => {
      state.endDate = payload
      state.sortBy = 'date'
    }
    // // set date range
    // setDateFilter: (state, { payload: { startDate, endDate } }) => {
    //   state.startDate = startDate
    //   state.endDate = endDate
    //   state.sortBy = 'date'
    // },

  }
})

export const { setTextFilter, flipSort, sortByDescription, sortByDate, sortByAmount, setStartDate, setEndDate } = filtersReducer.actions
export default filtersReducer