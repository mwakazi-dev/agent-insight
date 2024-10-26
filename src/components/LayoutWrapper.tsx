"use client";
import React, { FC, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import useAuth from "@/hooks/useAuth";

interface Props {
  user: any;
  children: React.ReactNode;
}

const LayoutWrapper: FC<Props> = ({ children, user }) => {
  const { setAuthState } = useAuth();
  const pathname = usePathname();

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
    setMounted(true);
  }, []);

  if (!mounted) {
    return <p>Loading...</p>;
  }

  if (shouldExcludeSidebar) {
    return <main className="w-full">{children} </main>;
  }

  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default LayoutWrapper;
