import React from "react";
import createClient from "@/lib/supabaselib/supabase-server";
import BlogCreateModal from "@/components/admin/modal/BlogCreateModal";

export default async function AdminPage() {
  const supabase = createClient();

  let { data: session } = await supabase.auth.getSession();

  console.log(session.session?.user.id);

  const { data: user } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.session?.user.id)
    .single();

  if (user?.role === "ADMIN") {
    return (
      <div>
        <div className="flex justify-start pb-10">
          <BlogCreateModal />
        </div>
      </div>
    );
  } else {
    return <h1>NOT ADMIN</h1>;
  }
}
