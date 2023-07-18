"use client";

import React, { useState, useEffect } from "react";
import supabaseclient from "@/lib/supabaselib/supabase-browser";
import BlogItemCard from "@/components/admin/blogItemCard/BlogItemCard";
import { BlogPostItem } from "@/lib/interface";
import { disconnect } from "process";

interface Props {
  params: {
    id: number;
  };
}

const BlogPostItemPage = ({ params }: Props) => {
  const [blogPostItems, setBlogPostItems] = useState<BlogPostItem[]>([]);
  const [supabase] = useState(() => supabaseclient);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("blog_post_item")
        .select("*")
        .eq("blogPostId", params.id);

      if (error) {
        console.log(error);
        return;
      }

      setBlogPostItems(data);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <a href="/admin" className="hover:text-base-300 underline">
        {"<- back to Admin panel"}
      </a>
      <div className="flex justify-center items-center flex-col gap-4">
        {blogPostItems.map((blogItem, index) => (
          <div className="w-full">
            <BlogItemCard key={index} blogPostItem={blogItem} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPostItemPage;
