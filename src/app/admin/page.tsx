"use client";

import supabaseclient from "@/lib/supabaselib/supabase-browser";
import React, { useState } from "react";

export default async function AdminPage() {
  const [supabase] = useState(() => supabaseclient);

  let { data: user } = await supabase.from("profiles").select("*").single();

  if (user.role === "ADMIN") {
    return (
      <div>
        <h1>{"ADMIN PAGE"}</h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1>{"NOT ADMIN"}</h1>
      </div>
    );
  }
}
