import HeroPage from "@/components/LandingPage/HeroPage";
import NavbarLinks from "@/components/Navbar/NavbarLinks";
import React from "react";

export default function Home() {
  return (
    <main className="mx-10">
      <div className="pb-32">
        <NavbarLinks />
      </div>
      <HeroPage />
    </main>
  );
}
