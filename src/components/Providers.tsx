"use client";

import React, { FC } from "react";
import { Provider } from "react-redux";

import { store } from "@/store/store";
import AuthProvider from "@/context/AuthContext";

interface Props {
  children: React.ReactNode;
}
const Providers: FC<Props> = ({ children }) => {
  return (
    <AuthProvider>
      <Provider store={store}>{children}</Provider>
    </AuthProvider>
  );
};

export default Providers;
