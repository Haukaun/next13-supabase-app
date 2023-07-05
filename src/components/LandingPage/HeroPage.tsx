import Image from "next/image";
import React from "react";

export default function HeroPage() {
  return (
    <div className="">
      <div className="hero">
        <div className="hero-content text-center">
          <div className="max-w-[80%] flex justify-center items-center flex-col">
            <h1 className="text-4xl sm:text-6xl font-bold">
              Explore the Blogosphere
            </h1>
            <p className="py-6">
              Welcome to our blog platform, your gateway to a world of
              fascinating insights and diverse perspectives. Start your reading
              journey with us today.
            </p>
            <button className="btn btn-primary mb-24">Dive In</button>
          </div>
        </div>
      </div>
    </div>
  );
}
