"use client";

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  users: any[];
  user: any;
}

const initialState: UserState = {
  users: [],
  user: null,
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
    removeUser: (state: any, action: PayloadAction<string>) => {
      const index = state.users.findIndex(
        (user: any) => user.uid === action.payload
      );
      if (index > -1) {
        state.users.splice(index, 1);
      }
    },
    setSelectedUser: (state: any, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    updateUser: (state: any, action: PayloadAction<any>) => {
      const index = state.users.findIndex(
        (user: any) => user.uid === action.payload.uid
      );
      if (index > -1) {
        state.users[index] = { ...state.users[index], ...action.payload };
      }
    },
  },
});

export const selectUserById = (state: { user: UserState }, id: string) =>
  state.user.users.find((user) => user.uid === id);

export const { setUsers, addUser, removeUser, setSelectedUser, updateUser } =
  userSlice.actions;
export default userSlice.reducer;
