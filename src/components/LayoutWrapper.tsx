"use client";

import React, { FC, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import useAuth from "@/hooks/useAuth";
import DashboardLayout from "./DashboardLayout";
import { useDispatch } from "react-redux";
import { setUsers } from "@/slices/userSlice";

interface Props {
  user: any;
  users: any[];
  children: React.ReactNode;
}

const LayoutWrapper: FC<Props> = ({ children, user, users }) => {
  const { setAuthState } = useAuth();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const [mounted, setMounted] = useState(false);

  const noLayoutRoutes = ["/login"];

  const shouldExcludeSidebar = noLayoutRoutes.includes(pathname);

  useEffect(() => {
    if (user?.email) {
      setAuthState!({
        authenticated: true,
        username: user?.email,
        id: user?.userId,
        roles: user?.roles,
        error: null,
      });
    }
    if (users?.length > 0) {
      dispatch(setUsers(users));
    }
    setMounted(true);
  }, [dispatch, setAuthState]);

  if (!mounted) {
    return <p>Loading...</p>;
  }

  if (shouldExcludeSidebar) {
    return <main className="w-full">{children} </main>;
  }

  return (
    <>
      <DashboardLayout>
        <main style={{ minHeight: "80vh" }}>{children}</main>
      </DashboardLayout>
    </>
  );
};

export default LayoutWrapper;
