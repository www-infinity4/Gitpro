import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GP Suite — Quantum Intelligence for GitHub",
  description:
    "Gitpro 🛸 is your quantum mechanic AI: top-level page content edits, styling, design ideas, and assimilations for your GitHub repos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="h-full flex">{children}</body>
    </html>
  );
}
