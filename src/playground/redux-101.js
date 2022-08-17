// Redux: Older approach (around version 3.7.2)
import { createStore } from 'redux'


const incrementCount = ({ amount = 1 } = {}) => ({
  type: 'INCREMENT',
  amount
})
const decrementCount = ({ amount = 1 } = {}) => ({
  type: 'DECREMENT',
  amount
})
const resetCount = () => ({
  type: 'RESET',
})
const setCount = ({ amount = 0 } = {}) => ({
  type: 'SET',
  amount
})

// This is a reducer
const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + action.amount }
    case 'DECREMENT':
      return { count: state.count - action.amount }
    case 'SET':
      return { count: action.amount }
    case 'RESET':
      return { count: 0 }
    default:
      return state
  }
})

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
})

unsubscribe()

store.dispatch(decrementCount({ amount: 10 }));

store.dispatch(decrementCount());

store.dispatch(incrementCount({ amount: 5 }));

store.dispatch(incrementCount());

store.dispatch(resetCount());

store.dispatch(setCount({ amount: 104 }));


// Newer Approach (example based on https://redux.js.org/tutorials/quick-start)
import { configureStore, createSlice } from '@reduxjs/toolkit'

const counterReducer = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    test: (state, action) => { console.log(action) },
    increment: (state, { payload = 1 } = {}) => { state.value += payload },
    decrement: (state, { payload = 1 } = {}) => { state.value -= payload },
    reset: state => { state.value = 0 },
    set: (state, { payload = 0 } = {}) => { state.value = payload },
  }
})

const newStore = configureStore({
  reducer: {
    count: counterReducer.reducer
  }
})

const newUnsubscribe = newStore.subscribe(() => {
  console.log(newStore.getState().count);
})

const { test, increment, decrement, reset, set } = counterReducer.actions
newStore.dispatch(increment())
newStore.dispatch(increment())
newStore.dispatch(increment())
newStore.dispatch(increment())
newStore.dispatch(increment())
newStore.dispatch(increment())
newStore.dispatch(decrement())
newStore.dispatch(reset())
newStore.dispatch(increment(20))
newStore.dispatch(decrement(10))
newStore.dispatch(set(100))
newStore.dispatch(set())
newStore.dispatch(test(100))
