"use client";
import BlogItemCard from "@/components/admin/blogItemCard/BlogItemCard";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface Props {
  params: {
    id: number;
  };
}

const BlogPostItemPage = async ({ params }: Props) => {
  const [blogItems, setBlogItems] = useState<BlogPostItem[]>([]);
  const { data: session } = useSession();

  async function getBlogItemsByBlogId(blogPostId: number) {
    const res = await fetch("/api/blogPost/blogPostItem/" + blogPostId);
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return await res.json();
  }

  useEffect(() => {
    if (params?.id) {
      getBlogItemsByBlogId(params?.id)
        .then((blogItems) => setBlogItems(blogItems))
        .catch((err) => console.error(err));
    }
  }, [params?.id]);

  if (blogItems.length === 0)
    return (
      <div className="flex items-center flex-col">
        <img src="/sad404.ffc1ba45.svg" alt="" />
        <div className="text-4xl font-color-100 pb-32">
          BLOG-ITEMS NOT FOUND
        </div>
      </div>
    );

  if (session?.user.role === "ADMIN") {
    return (
      <div className="flex justify-center items-center flex-col gap-3 w-full">
        <a href="/admin" className="hover:text-base-300 underline">
          {"<- back to Admin panel"}
        </a>
        <h1>Blog Items</h1>
        {blogItems.map((blogItem) => (
          <BlogItemCard key={blogItem.id} blogPostItem={blogItem} />
        ))}
      </div>
    );
  }
  return (
    <div>
      <h1>Only admins can access this page</h1>
    </div>
  );
};

export default BlogPostItemPage;
