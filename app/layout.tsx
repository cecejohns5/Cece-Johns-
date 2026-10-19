import type { Metadata } from "next";
import "./globals.css";
import AuthStatus from "./_lib/AuthStatus";
import TabBar from "./_lib/TabBar";

export const metadata: Metadata = {
  title: "Study Task List",
  description:
    "A study task list for language learners, by Cece Johns.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthStatus />
        <TabBar />
        {children}
      </body>
    </html>
  );
}
