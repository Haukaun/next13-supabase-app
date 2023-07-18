import React from "react";
import NavBar from "@/components/Navbar/NavBar";
import "./globals.css";
import { Poppins } from "next/font/google";
import Footer from "@/components/LandingPage/Footer";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="">
      <body className={poppins.className + "flex min-h-screen w-full"}>
        <div className="max-w-4xl flex flex-col min-h-screen mx-auto">
          <NavBar />
          <div className="flex-grow mx-10">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
