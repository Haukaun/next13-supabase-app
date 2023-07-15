"use client";

import React, { useState, useEffect } from "react";
import supabaseclient from "@/lib/supabaselib/supabase-browser";
import BlogItemCard from "@/components/admin/blogItemCard/BlogItemCard";
import { BlogPostItem } from "@/lib/interface";

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
      <div className="flex justify-center items-center flex-col gap-3">
        {blogPostItems.map((blogItem, index) => (
          <BlogItemCard key={index} blogPostItem={blogItem} />
        ))}
      </div>
    </div>
  );
};

export default BlogPostItemPage;
