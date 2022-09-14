import { auth } from "../firebase/firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { startSetExpenses } from "./expenses"

const startLogin = createAsyncThunk(
  'auth/startLogin',
  async ({ email, password }, { dispatch }) => {
    let userCreds = null
    try {
      userCreds = await signInWithEmailAndPassword(auth, email, password)
    }
    catch (err) {
      console.log(err.code, err.message);
      dispatch(authFail(err))
      return
    }
    dispatch(logIn(userCreds.user.uid))
    dispatch(startSetExpenses())
  }
)

const startLogout = createAsyncThunk(
  'auth/startLogout',
  async (_, { dispatch }) => {
    try {
      await signOut(auth)
    }
    catch (err) {
      console.log(err.code, err.message);
      dispatch(authFail(err))
      return
    }
    dispatch(logOut())
  }
)

const startRegister = createAsyncThunk(
  'auth/startRegister',
  async ({ email, password }, { dispatch }) => {
    try {
      const userCreds = await createUserWithEmailAndPassword(auth, email, password)
    }
    catch (err) {
      console.log(err.code, err.message);
      dispatch(authFail(err))
    }
    dispatch(logIn(userCreds.user))
  }
)


// Authentication Reducer
const authReducer = createSlice({
  name: 'auth',
  initialState: {
    userCreds: null,
    err: null
  },
  reducers: {
    logIn: (state, { payload }) => {
      state.userCreds = payload
      state.err = null
    },
    logOut: (state) => {
      state.userCreds = null
    },
    authFail: (state, { payload }) => {
      state.err = payload
      state.userCreds = null
    }
  }
})

export const { logIn, logOut, authFail } = authReducer.actions
export { startRegister, startLogin, startLogout, authReducer as default }
