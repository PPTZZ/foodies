import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/lib/components/QueryProvider";

export const metadata: Metadata = {
  title: "Foodies",
  description: "Your AI powered food inspiration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased flex flex-col items-center py-16`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
