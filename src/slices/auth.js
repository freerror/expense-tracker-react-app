import { auth } from "../firebase/firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { startSetExpenses } from "./expenses"

const startLogin = createAsyncThunk(
  'auth/startLogin',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    let userCreds = null
    try {
      userCreds = await signInWithEmailAndPassword(auth, email, password)
    }
    catch (err) {
      return rejectWithValue(err.message)
    }
    dispatch(logIn(userCreds.user.uid))
    dispatch(startSetExpenses())
  }
)

const startLogout = createAsyncThunk(
  'auth/startLogout',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await signOut(auth)
    }
    catch (err) {
      return rejectWithValue(err.message)
    }
    dispatch(logOut())
  }
)

const startRegister = createAsyncThunk(
  'auth/startRegister',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    let userCreds = null
    try {
      userCreds = await createUserWithEmailAndPassword(auth, email, password)
    }
    catch (err) {
      return rejectWithValue(err.message)
    }
    dispatch(logIn(userCreds.user.uid))
  }
)


// Authentication Reducer
const authReducer = createSlice({
  name: 'auth',
  initialState: {
    userID: null,
    err: null
  },
  reducers: {
    logIn: (state, { payload }) => {
      state.userID = payload
      state.err = null
    },
    logOut: (state) => {
      state.userID = null
    }
  },
  extraReducers: {
    [startLogin.rejected]: (state, { payload }) => {
      state.err = payload
      state.userID = null
    }
  }
})

export const { logIn, logOut, authFail } = authReducer.actions
export { startRegister, startLogin, startLogout, authReducer as default }
