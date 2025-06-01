import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "./components/LenisProvider";
import { poppins } from "./utils/font";


export const metadata: Metadata = {
  title: "Deflated Pappadam",
  description: " We r a pappadam but deflated",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} ${poppins.variable} antialiased`}
      >
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
