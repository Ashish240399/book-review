import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ObjectId } from "mongodb";

type User = {
  name: string;
  email: string;
  _id: ObjectId;
  token: string;
};

type UserDetails = {
  user: User | null;
};

const initialState: UserDetails = {
  user: null,
};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    removeUser: (state, action) => {
      state.user = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
