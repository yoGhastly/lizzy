import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FloatingNavbar } from "./modules/common/components/floating-navbar";
import { navItems } from "./constants";
import { Providers } from "./providers/providers";
import { Suspense } from "react";
import { OpenCart } from "./modules/cart/components/open-cart";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Novi Nails Shop",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <main
            className={`${inter.className} max-w-6xl mx-auto flex flex-col min-h-screen`}
          >
            <Suspense>
              <FloatingNavbar navItems={navItems} cart={<OpenCart />} />
            </Suspense>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
