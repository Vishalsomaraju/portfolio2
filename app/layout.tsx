"use client";

import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { CursorProvider } from "@/providers/cursor-provider";
import { LenisProvider } from "@/providers/lenis-provider";
import Cursor from "@/components/cursor/cursor";
import { Grain } from "@/components/ui/grain";
import { Nav } from "@/components/ui/nav";
import { Preloader } from "@/components/ui/preloader";

import { Bricolage_Grotesque, DM_Sans } from "next/font/google";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${bricolageGrotesque.variable} ${dmSans.variable}`}>
      <head>
        {/* Blocking script — runs before first paint to prevent theme flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('portfolio-theme');if(t==='light'){document.documentElement.classList.add('light');}else{document.documentElement.classList.remove('light');}}catch(e){}})();`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <ThemeProvider defaultTheme="dark">
          <LenisProvider>
            <CursorProvider>
              {/* Preloader sits on top of everything — unmounts itself after done */}
              <Preloader />
              <Grain />
              <Cursor />
              <Nav />
              {children}
            </CursorProvider>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
