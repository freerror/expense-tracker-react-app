import { auth } from "../firebase/firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { setExpenses, startSetExpenses } from "./expenses"

const startRestoreUser = createAsyncThunk(
  'auth/startRestoreUser',
  async (_, { dispatch, rejectWithValue }) => {
    let uidLocal;
    try {
      uidLocal = localStorage.getItem("uid")
    }
    catch (err) {
      return rejectWithValue(err.message)
    }
    dispatch(logIn(uidLocal))
    dispatch(startSetExpenses())
  }
)

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
    const uid = userCreds.user.uid
    localStorage.setItem('uid', uid)
    dispatch(logIn(uid))
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
    localStorage.removeItem('uid')
    dispatch(logOut())
    dispatch(setExpenses([]))
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
    },
    [startRegister.rejected]: (state, { payload }) => {
      state.err = payload
      state.userID = null
    }
  }
})

export const { logIn, logOut, authFail } = authReducer.actions
export { startRegister, startRestoreUser, startLogin, startLogout, authReducer as default }
