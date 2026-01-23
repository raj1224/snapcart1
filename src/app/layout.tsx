import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/Provider";


export const metadata: Metadata = {
  title: "Snapcart | 10 minutes delivery",
  description: "Snapcart is your go-to app for quick and easy grocery delivery in just 10 minutes. Shop from a wide selection of products and have them delivered straight to your door in no time!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full min-h-screen bg-linear-to-b from-green-200 to-white">
        <Provider>
        {children}
        </Provider>
      </body>
    </html>
  );
}
