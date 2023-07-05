import HeroPage from "@/components/LandingPage/HeroPage";
import NavbarLinks from "@/components/Navbar/NavbarLinks";
import BlogCardList from "@/components/admin/blogCardAdmin/BlogCardLongList";
import React from "react";

export default function Home() {
  return (
    <main>
      <div className="pb-32">
        <NavbarLinks />
      </div>
      <HeroPage />
      <BlogCardList />
    </main>
  );
}
