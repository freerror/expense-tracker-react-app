import { auth, firebase } from "../firebase/firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const startLogin = createAsyncThunk(
  'auth/startLogin',
  async ({ email, password }, { dispatch }) => {
    try {
      const userCreds = await signInWithEmailAndPassword(auth, email, password)
      console.log(email, password)
      dispatch(logIn(userCreds.user))
    }
    catch (err) {
      console.log(err.code, err.message);
      dispatch(logInFail(err))
    }
  }
)

const startRegister = createAsyncThunk(
  'auth/startRegister',
  async ({ email, password }, { dispatch }) => {
    try {
      const userCreds = await createUserWithEmailAndPassword(auth, email, password)
      dispatch(logIn(userCreds.user))
    }
    catch (err) {
      console.log(err.code, err.message);
      dispatch(logInFail(err))
    }
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
    logInFail: (state, { payload }) => {
      state.err = payload
      state.userCreds = null
    }
  }
})

export const { logIn, logInFail } = authReducer.actions
export { startRegister, startLogin, authReducer as default }
