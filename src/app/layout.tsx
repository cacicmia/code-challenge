import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Software sauna coding challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} m-0  p-8 h-screen`}>
        <header className="text-dark max-h-12 w-full flex flex-col items-center justify-center pb-8 text-center">
          Software sauna coding challenge
        </header>
        <main className="w-full h-full items-center justify-between ">
          {children}
        </main>
      </body>
    </html>
  );
}
