"use client";

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  users: any[];
}

const initialState: UserState = {
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state: any, action: PayloadAction<any[]>) => {
      state.users = action.payload;
    },
    addUser: (state: any, action: PayloadAction<any>) => {
      state.users.push(action.payload);
    },
  },
});

export const selectUserById = (state: { user: UserState }, id: string) =>
  state.user.users.find((user) => user.uid === id);

export const { setUsers, addUser } = userSlice.actions;
export default userSlice.reducer;
