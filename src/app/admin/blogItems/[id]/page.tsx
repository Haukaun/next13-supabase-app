"use client";
import { BlogPostItem } from "@/lib/interface";
import React, { useEffect, useState } from "react";
import supabaseclient from "@/lib/supabaselib/supabase-browser";

interface Props {
  params: {
    id: number;
  };
}

const BlogPostItemPage = async ({ params }: Props) => {
  const [blogItems, setBlogItems] = useState<BlogPostItem[]>([]);

  const [supabase] = useState(() => supabaseclient);

  useEffect(() => {
    const fetchData = async () => {
      const { data: BlogPostItems } = await supabase
        .from("blog_post_item")
        .select("*")
        .eq("blogPostId", params.id);

      console.log(BlogPostItems);

      if (BlogPostItems) {
        setBlogItems(BlogPostItems);
      } else {
        setBlogItems([]);
      }
    };
    fetchData();
  }, [params.id]);

  if (blogItems.length === 0)
    return (
      <div className="flex items-center flex-col">
        <img src="/sad404.ffc1ba45.svg" alt="" />
        <div className="text-4xl font-color-100 pb-32">
          BLOG-ITEMS NOT FOUND
        </div>
      </div>
    );

  return (
    <div className="flex justify-center items-center flex-col gap-3 w-full">
      <a href="/admin" className="hover:text-base-300 underline">
        {"<- back to Admin panel"}
      </a>
      <h1>Blog Items</h1>
      {blogItems.map((blogItem) => (
        <div>{blogItem.title}</div>
      ))}
    </div>
  );
};

export default BlogPostItemPage;
