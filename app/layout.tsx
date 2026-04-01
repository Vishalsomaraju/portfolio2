import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { LenisProvider } from "@/providers/lenis-provider";
import { Grain } from "@/components/ui/grain";
import { Nav } from "@/components/ui/nav";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vishal Somaraju — Full-Stack Developer",
  description:
    "Building precise, scalable architectures and immersive 3D web experiences. Full-Stack Developer open to opportunities.",
  openGraph: {
    title: "Vishal Somaraju — Full-Stack Developer",
    description: "Building digital worlds that feel alive.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${dmSans.variable}`}
    >
      <body>
        <ThemeProvider defaultTheme="dark">
          <LenisProvider>
            <Grain />
            <Nav />
            {children}
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
