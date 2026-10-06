import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
