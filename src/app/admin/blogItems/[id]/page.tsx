"use client";

import React, { useState } from "react";
import supabaseclient from "@/lib/supabaselib/supabase-browser";
import BlogItemCard from "@/components/admin/blogItemCard/BlogItemCard";

interface Props {
  params: {
    id: number;
  };
}

const BlogPostItemPage = async ({ params }: Props) => {
  const [supabase] = useState(() => supabaseclient);
  const { data: BlogPostItems, error } = await supabase
    .from("blog_post_item")
    .select("*")
    .eq("blogPostId", params.id);

  if (error) {
    console.log(error);
    return;
  }

  return (
    <div className="">
      <a href="/admin" className="hover:text-base-300 underline">
        {"<- back to Admin panel"}
      </a>
      <h1>Blog Items</h1>
      <div className="flex justify-center items-center flex-col gap-3 w-full">
        {BlogPostItems.map((blogItem) => (
          <BlogItemCard blogPostItem={blogItem} />
        ))}
      </div>
    </div>
  );
};

export default BlogPostItemPage;
