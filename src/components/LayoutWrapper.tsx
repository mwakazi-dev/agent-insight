"use client";

import React, { FC, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";

import useAuth from "@/hooks/useAuth";
import DashboardLayout from "./DashboardLayout";
import { setUsers } from "@/slices/userSlice";

interface Props {
  user: any;
  children: React.ReactNode;
}

const LayoutWrapper: FC<Props> = ({ children, user }) => {
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
        email: user?.email,
        displayName: user?.displayName,
        phoneNumber: user?.phoneNumber,
        uid: user?.userId,
        roles: user?.roles,
        error: null,
      });
    }

    setMounted(true);
  }, [setAuthState]);

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
