import filtersReducer from "../../slices/filters";

const default_state = {
  text: '',
  sortDescending: true,
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined,
}

test('Ensure defaults', () => {
  const state = filtersReducer.getInitialState()
  expect(state).toEqual(default_state)
})

test('Set sortBy amount', () => {
  const state = { ...default_state }
  filtersReducer.caseReducers.sortByAmount(state)
  expect(state).toEqual({
    ...default_state,
    sortBy: 'amount'
  })
})


test('Set sortBy date', () => {
  const state = {
    ...default_state,
    sortBy: 'description'
  }
  filtersReducer.caseReducers.sortByDate(state)
  expect(state).toEqual({
    ...default_state,
    sortBy: 'date'
  })
})

test('Set sortBy description', () => {
  const state = { ...default_state }
  filtersReducer.caseReducers.sortByDescription(state)
  expect(state).toEqual({
    ...default_state,
    sortBy: 'description'
  })
})

test('Flip sort direction', () => {
  const state = { ...default_state }
  filtersReducer.caseReducers.flipSort(state)
  expect(state).toEqual({
    ...default_state,
    sortDescending: false
  })
  filtersReducer.caseReducers.flipSort(state)
  expect(state).toEqual({
    ...default_state,
    sortDescending: true
  })
})

test('Set StartDate', () => {
  const state = { ...default_state }
  filtersReducer.caseReducers.setStartDate(state, { payload: 1234 })
  expect(state).toEqual({
    ...default_state,
    startDate: 1234
  })
})

test('Set EndDate', () => {
  const state = { ...default_state }
  filtersReducer.caseReducers.setStartDate(state, { payload: 4321 })
  expect(state).toEqual({
    ...default_state,
    startDate: 4321
  })
})