"use client";

import React, { useState } from "react";

export default function NavbarLinks() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div>
      <button onClick={toggleOpen} className="sm:hidden block">
        Category
      </button>

      <div className={`sm:flex ${isOpen ? "block" : "hidden"} sm:block`}>
        <div className="w-full container mx-auto flex flex-col sm:flex-row items-center justify-center text-sm font-bold uppercase mt-0 px-6 py-2">
          <a href="#" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">
            Technology
          </a>
          <a href="#" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">
            Games
          </a>
          <a href="#" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">
            Christmas
          </a>
          <a href="#" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">
            Gifts
          </a>
          <a href="#" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">
            Cloths
          </a>
        </div>
      </div>
    </div>
  );
}
