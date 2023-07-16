import React from "react";
import createclient from "@/lib/supabaselib/supabase-server";
import BlogCard from "./card/BlogCard";

export default async function MasonryGrid() {
  const supabase = createclient();

  //get the newest 10 blogposts
  const { data: blogs, error } = await supabase
    .from("blog_post")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    console.log(error);
    return <div>Failed to load</div>;
  }

  return (
    <div>
      <h1 className="flex items-center justify-center pb-10 text-3xl font-bold">
        Latest posts
      </h1>
      <div className="sm:columns-2 md:columns-3">
        {blogs.map((blog, index) => (
          <BlogCard key={index} blogPost={blog} />
        ))}
      </div>
    </div>
  );
}
