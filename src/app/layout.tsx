import React from "react";
import NavBar from "@/components/Navbar/NavBar";
import "./globals.css";
import { Poppins } from "next/font/google";
import Footer from "@/components/LandingPage/Footer";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="flex flex-col items-center w-full">
      <body className={poppins.className + ""}>
        <div className="max-w-5xl mx-5 flex flex-col min-h-screen">
          <NavBar />
          <div className="flex-grow">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
