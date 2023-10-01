"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import AuthProvider from "@/store/AuthProvider";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Shopmore - Your go to Ecommerce App",
//   description: "Shopmore Ecommerece App - by Abhishek Singh",
// };

let showNavbar = true;

export default function RootLayout({ children }) {
  const path = usePathname();

  showNavbar = !(path === "/login" || path === "/signup");

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Toaster position="top-center" reverseOrder={false} />
          {showNavbar && <Navbar />}
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
