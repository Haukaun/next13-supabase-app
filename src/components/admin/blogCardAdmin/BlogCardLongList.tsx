"use client";

import React, { useEffect, useState } from "react";
import BlogCardLong from "@/components/admin/blogCardAdmin/BlogCardLong";
import { useSession } from "next-auth/react";

async function getBlogsByUser(userId: number, accessToken: string) {
  const res = await fetch("/api/user/" + userId, {
    headers: {
      authorization: ` ${accessToken}`,
    },
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return await res.json();
}

export default function BlogCardList() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      getBlogsByUser(session?.user.id, session?.user.accessToken)
        .then((blogs) => setBlogs(blogs))
        .catch((err) => console.error(err));
    }
  }, [status]);

  return (
    <div className="flex flex-col gap-5 w-full">
      {blogs.map((blog, index) => (
        <div key={index}>
          <BlogCardLong blogPost={blog} />
        </div>
      ))}
    </div>
  );
}
