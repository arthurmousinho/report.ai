import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/sonner"
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "report.ai",
  description: "An intelligent report generator using Vercel AI SDK",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>✨</text></svg>"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full h-dvh flex flex-col items-center`}
      >
        <Toaster />
        <div className="w-[95vw] max-w-[1200px]">
          <Providers>
            {children}
          </Providers>
        </div>
        <footer className="text-xs text-muted-foreground text-center mt-10 pb-10">
          &copy; {new Date().getFullYear()} Arthur Mousinho
        </footer>
      </body>
    </html>
  );
}
