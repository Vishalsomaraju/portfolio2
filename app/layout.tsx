import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { ThemeProvider } from "@/providers/theme-provider";
import { CursorProvider } from "@/providers/cursor-provider";
import { LenisProvider } from "@/providers/lenis-provider";

// Note: Replace with Bricolage / DM Sans later according to design system
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Premium 3D Portfolio",
  description: "From Chaos to Systems",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-base text-primary overflow-x-hidden`}>
        <ThemeProvider defaultTheme="dark">
          <LenisProvider>
            <CursorProvider>
              {children}
            </CursorProvider>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
