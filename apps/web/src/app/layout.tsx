"use client";

import { Toaster } from "@/components/composites/toaster";
import { store } from "@/stores";
import localFont from "next/font/local";
import { Provider } from "react-redux";
import { Header } from "./components/header";
import { Sidebar } from "./components/sidebar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={plusJakartaSans.className}>
        <Provider store={store}>
          <Toaster />
          <main className="font- flex h-full w-full flex-row p-6">
            <Sidebar />
            <div className="flex h-full flex-1 flex-col">
              <Header />
              {children}
            </div>
          </main>
        </Provider>
      </body>
    </html>
  );
}

const plusJakartaSans = localFont({
  src: [
    {
      path: "./fonts/plus-jakarta-sans/PlusJakartaSans-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/plus-jakarta-sans/PlusJakartaSans-ExtraLightItalic.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "./fonts/plus-jakarta-sans/PlusJakartaSans-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/plus-jakarta-sans/PlusJakartaSans-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/plus-jakarta-sans/PlusJakartaSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/plus-jakarta-sans/PlusJakartaSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/plus-jakarta-sans/PlusJakartaSans-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/plus-jakarta-sans/PlusJakartaSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/plus-jakarta-sans/PlusJakartaSans-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "./fonts/plus-jakarta-sans/PlusJakartaSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/plus-jakarta-sans/PlusJakartaSans-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./fonts/plus-jakarta-sans/PlusJakartaSans-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/plus-jakarta-sans/PlusJakartaSans-ExtraBoldItalic.ttf",
      weight: "800",
      style: "italic",
    },
  ],
});
