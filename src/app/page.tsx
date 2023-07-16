import HeroPage from "@/components/LandingPage/HeroPage";
import MasonryGrid from "@/components/LandingPage/MasonryGrid";
import NavbarLinks from "@/components/Navbar/NavbarLinks";
import React from "react";

export default function Home() {
  return (
    <main className="">
      <div className="pb-32">
        <NavbarLinks />
      </div>
      <HeroPage />
      <MasonryGrid />
    </main>
  );
}
