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
    <html lang="en" className="">
      <body className={poppins.className + "flex flex-col min-h-screen w-full"}>
        <div className="max-w-4xl mx-auto flex flex-col min-h-screen">
          <div className="mx-8">
            <NavBar />
            <div className="flex-grow">{children}</div>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
