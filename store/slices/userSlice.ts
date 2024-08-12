import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {ISignUpData, IUser} from '@/types/api/auth.types';
// import type { PayloadAction } from '@reduxjs/toolkit'

// Define the initial state using that type
const initialState: ISignUpData = {
  f_name: '',
  l_name: '',
  email: '',
  phone: '',
  password: '',
};

const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUserState: (state, action: PayloadAction<ISignUpData>) => {
      return action.payload;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
  },
});

export const {setUserState} = userSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const selectUserState = (state: RootState) => state.user;

export default userSlice.reducer;
