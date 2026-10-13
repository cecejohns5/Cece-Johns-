import type { Metadata } from "next";
import "./globals.css";
import AuthStatus from "./_lib/AuthStatus";

export const metadata: Metadata = {
  title: "Cece Johns",
  description: "I am a freshman at UH Manoa",
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
        {children}
      </body>
    </html>
  );
}
