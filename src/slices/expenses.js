import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { addDoc, deleteDoc, collection, doc, updateDoc, getDocs } from 'firebase/firestore'
import db from '../firebase/firebase.js'

const startAddExpense = createAsyncThunk(
  'expenses/startAddExpense',
  async (expenseData, thunkAPI) => {
    const docRef = await addDoc(collection(db, "expenses"), expenseData)
    thunkAPI.dispatch(addExpense({
      ...expenseData,
      id: docRef.id
    }))
  }
)

const startEditExpense = createAsyncThunk(
  'expenses/startEditExpense',
  async ({ id, ...expenseData }, thunkAPI) => {
    console.log("updating ", id, "with ", expenseData);
    await updateDoc(doc(db, "expenses", id), expenseData)
    thunkAPI.dispatch(editExpense({
      ...expenseData,
      id
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

const startSetExpenses = createAsyncThunk(
  'expenses/startSetExpenses',
  async (_, thunkAPI) => {
    const qSnap = await getDocs(collection(db, "expenses"))
    const expenses = []
    qSnap.forEach(doc => {
      expenses.push({ id: doc.id, ...doc.data() })
    })
    thunkAPI.dispatch(setExpenses(expenses))
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
    },
    // set expenses
    setExpenses: (state, { payload }) => {
      state.items = payload
    }
  }
})

export const { addExpense, editExpense, removeExpense, setExpenses } = expensesReducer.actions
export { startAddExpense, startEditExpense, startRemoveExpense, startSetExpenses, expensesReducer as default }