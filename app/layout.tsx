import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthHeader from "@/components/AuthHeader";
import { getUser } from "@/actions/auth/user.action";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser({ serverComponent: true });
  console.log(">>user", user);

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthHeader user={user} />
        {children}
      </body>
    </html>
  );
}
