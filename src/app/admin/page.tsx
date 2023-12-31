import React from "react";
import createClient from "@/lib/supabaselib/supabase-server";
import BlogCreateModal from "@/components/admin/modal/BlogCreateModal";
import BlogCardLong from "@/components/admin/blogCardAdmin/BlogCardLong";

export default async function AdminPage() {
  const supabase = createClient();

  let { data: session } = await supabase.auth.getSession();

  const { data: user } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.session?.user.id)
    .single();

  const { data: blogPosts } = await supabase
    .from("blog_post")
    .select("*")
    .eq("user", session.session?.user.id);

  if (user?.role === "ADMIN") {
    return (
      <div className="">
        <div className="flex justify-start py-10">
          <BlogCreateModal />
        </div>
        <div className="flex justify-center items-center flex-col gap-4">
          {blogPosts?.map((blogPost) => (
            <div className="w-full">
              <BlogCardLong blogPost={blogPost} />
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return <h1>NOT ADMIN</h1>;
  }
}
