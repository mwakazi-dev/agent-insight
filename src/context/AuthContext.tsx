"use client";

import { createContext, FC, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Roles } from "@/types/enums";
import { signin, signout } from "@/app/actions/auth";

interface AuthProps {
  authState: {
    authenticated: boolean | null;
    uid: string;
    email: string | null;
    displayName: string | null;
    phoneNumber: string | null;
    roles: Roles[];
    error: string | null;
  };
  onLogin: (email: string, password: string) => void;
  onLogout: () => void;
  isAuthenticating?: boolean;
  setAuthState: (newState: Partial<AuthProps["authState"]>) => void;
}

export const AuthContext = createContext<Partial<AuthProps>>({});

type Props = {
  children: any;
};

const AuthProvider: FC<Props> = ({ children }) => {
  const router = useRouter();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authState, setAuthState] = useState<{
    authenticated: boolean | null;
    email: string | null;
    displayName: string | null;
    phoneNumber: string | null;
    uid: string | null;
    roles: Roles[];
    error: string | null;
  }>({
    authenticated: null,
    email: null,
    uid: null,
    displayName: null,
    phoneNumber: null,
    roles: [],
    error: null,
  });

  const loginHandler = async (email: string, password: string) => {
    setIsAuthenticating(true);
    try {
      const res = await signin(email, password);

      if (!res.success) {
        setAuthState({ ...authState, error: res?.error?.message ?? "" });
      } else {
        setAuthState({
          authenticated: true,
          email: res?.data?.email ?? "",
          displayName: res?.data?.displayName ?? "",
          phoneNumber: res?.data?.phoneNumber ?? "",
          uid: res?.data?.userId ?? "",
          roles: res?.data?.roles ?? [Roles.USER],
          error: null,
        });
        router.replace("/");
      }

      setIsAuthenticating(false);
    } catch (error) {
      setAuthState({
        ...authState,
        error: "An error occurred while trying to sign in. Please try again.",
      });

      setIsAuthenticating(false);
    }
  };

  const logoutHandler = async () => {
    const res = await signout();

    if (res.success) {
      setAuthState({
        authenticated: false,
        email: null,
        displayName: null,
        phoneNumber: null,
        uid: null,
        roles: [],
        error: null,
      });
      router.push("/login");
    }
  };

  const value = useMemo(() => {
    return {
      authState,
      onLogin: loginHandler,
      onLogout: logoutHandler,
      isAuthenticating,
      setAuthState,
    };
  }, [authState, loginHandler, logoutHandler, isAuthenticating]);

  return (
    <AuthContext.Provider value={value as AuthProps}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
