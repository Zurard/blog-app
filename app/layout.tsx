import type { Metadata } from "next";
import { ThemeProvider } from "./context/ThemeContext";
import { Geist, Geist_Mono , Orbitron ,Libre_Caslon_Display ,Fleur_De_Leah } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const libreCaslonDisplay = Libre_Caslon_Display({
  variable: "--font-libre-caslon-display",
  subsets: ["latin"],
  weight: "400",
});

const fleurDeLeah = Fleur_De_Leah({
  variable: "--font-fleur-de-leah",
  subsets: ["latin"],
  weight: "400",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${libreCaslonDisplay.variable} ${fleurDeLeah.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
