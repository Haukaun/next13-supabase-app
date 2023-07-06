import React from "react";
import createClient from "@/lib/supabaselib/supabase-server";

export default async function AdminPage() {
  const supabase = createClient();

  let { data: session } = await supabase.auth.getSession();

  const { data: user } = await supabase
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
