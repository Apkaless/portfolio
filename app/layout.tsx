import type { Metadata, Viewport } from "next";
import { Rajdhani } from "next/font/google";
import "./globals.css";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-rajdhani",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Apkaless | Developer. Tactician. Digital Soldier.",
  description:
    "A cinematic battlefield command-center portfolio for Apkaless, showcasing developer skills, GitHub missions, tools, automation, and contact channels.",
  keywords: [
    "Apkaless",
    "developer portfolio",
    "GitHub projects",
    "automation",
    "gaming tools",
    "Windows utilities",
    "Linux tools"
  ],
  authors: [{ name: "Apkaless" }],
  icons: {
    icon: "/favicon.svg"
  },
  openGraph: {
    title: "Apkaless | Developer Portfolio",
    description: "Developer. Tactician. Digital Soldier.",
    url: "https://github.com/Apkaless",
    siteName: "Apkaless Command Center",
    images: [
      {
        url: "/images/battlefield-4k.jpg",
        width: 1200,
        height: 630,
        alt: "Cinematic Battlefield 4K background"
      }
    ],
    type: "website"
  }
};

export const viewport: Viewport = {
  themeColor: "#050706",
  colorScheme: "dark"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${rajdhani.variable}`}>
      <body className="group/body">
        <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
          {/* CRT Screen Curvature / Vignette */}
          <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]" />
          {/* Global Scanline Overlay */}
          <div className="absolute inset-0 bg-scanline bg-[length:100%_6px] opacity-20 mix-blend-overlay" />
          <div className="absolute inset-0 animate-crt-flicker bg-black/5 opacity-10 mix-blend-overlay" />
        </div>
        {children}
      </body>
    </html>
  );
}
