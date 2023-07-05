"use client";

import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";

async function getThreeBlogs() {
  const res = await fetch("/api/blogPost/getThreeBlogs"); // Replace with your API endpoint if it's different
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return await res.json();
}

export default async function BlogCardList() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    getThreeBlogs()
      .then((blogs) => setBlogs(blogs))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="">
      <h1 className="font-bold text-2xl my-10">Latest posts</h1>
      {blogs.map((blog, index) => (
        <div
          key={index}
          className="w-full h-full flex justify-start items-center flex-wrap"
        >
          <BlogCard blogPost={blog} />
        </div>
      ))}
    </div>
  );
}
