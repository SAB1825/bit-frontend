import type { Metadata } from "next";
import { EB_Garamond,  Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/providers";


const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const eb_garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
})

export const metadata: Metadata = {
  title: "Bit staff portal",
  description: "Bit staff portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
         className={cn(inter.variable, eb_garamond.variable)}
      >
        <Providers>
        <Toaster />
        {children}
        </Providers>
      </body>
    </html>
  );
}
