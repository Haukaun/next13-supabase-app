"use client";

import React, { useState } from "react";

import createClient from "@/lib/supabaselib/supabase-browser";

interface props {
  userName: string;
}

export default function Dropdown({ userName }: props) {
  const [supabase] = useState(() => createClient);

  async function signOut() {
    await supabase.auth.signOut();
    window.location.reload();
  }

  return (
    <div className="dropdown dropdown-end">
      <div className="rounded-full cursor-pointer" tabIndex={0}>
        <img
          src={"https://github.com/" + userName + ".png"}
          className="rounded-full w-10 h-10"
          alt=""
        />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a onClick={signOut}>Sign out</a>
        </li>
      </ul>
    </div>
  );
}
