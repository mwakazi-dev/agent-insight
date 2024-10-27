import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Roboto } from "next/font/google";

import { getUser, getUsers } from "@/lib/dal";
import LayoutWrapper from "@/components/LayoutWrapper";
import Providers from "@/components/Providers";
import "./globals.css";

const fonts = Roboto({
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agent Track App",
  description:
    "Agent Track is a platform designed for admins to monitor and manage agents' on-site activities in real time.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  const allUsers = await getUsers();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fonts.className} suppressHydrationWarning>
        <AntdRegistry>
          <Providers>
            <LayoutWrapper
              user={user?.data}
              users={allUsers?.data?.users as any}
            >
              {children}
            </LayoutWrapper>
          </Providers>
        </AntdRegistry>
      </body>
    </html>
  );
}
