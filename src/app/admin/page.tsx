"use client";

import React, { useState, useEffect } from "react";
import supabaseclient from "@/lib/supabaselib/supabase-browser";

export default async function AdminPage() {
  const [supabase] = useState(() => supabaseclient);

  let { data: session } = await supabase.auth.getSession();

  const { data: user } = await supabaseclient
    .from("profiles")
    .select("*")
    .eq("id", session.session?.user.id)
    .single();

  if (user?.role === "ADMIN") {
    return <h1>ADMIN PAGE</h1>;
  } else {
    return <h1>NOT ADMIN</h1>;
  }
}
