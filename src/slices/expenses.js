import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { addDoc, deleteDoc, collection, doc } from 'firebase/firestore'
import db from '../firebase/firebase.js'

const startAddExpense = createAsyncThunk(
  'expenses/startAddExpense',
  async (expenseData, thunkAPI) => {
    const docRef = await addDoc(collection(db, "expenses"), expenseData)
    thunkAPI.dispatch(addExpense({
      id: docRef.id,
      ...expenseData
    }))
  }
)

const startRemoveExpense = createAsyncThunk(
  'expenses/startRemoveExpense',
  async (expenseID, thunkAPI) => {
    await deleteDoc(doc(db, "expenses", expenseID))
    thunkAPI.dispatch(removeExpense(expenseID))
  }
)


// Expenses Reducer
const expensesReducer = createSlice({
  name: 'expenses',
  initialState: {
    items: []
  },
  reducers: {
    // add expense
    addExpense: (state, { payload: {
      id,
      description = "",
      note = "",
      amount = undefined,
      createdAt = 0
    } }) => {
      state.items.push({
        id,
        description,
        note,
        amount,
        createdAt
      })
    },
    // edit Expense
    editExpense: (state, { payload }) => {
      const idx = state.items.findIndex(expense => expense.id == payload.id)
      state.items[idx] = {
        ...state.items[idx],
        ...payload
      }
    },
    // remove expense
    removeExpense: (state, { payload }) => {
      state.items = state.items.filter((expense) => {
        return expense.id !== payload
      })
    }
  }
})

export const { addExpense, editExpense, removeExpense } = expensesReducer.actions
export { startAddExpense, startRemoveExpense, expensesReducer as default }