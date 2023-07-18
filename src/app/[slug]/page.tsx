"use client";

import React, { useEffect, useState } from "react";
import supabase from "@/lib/supabaselib/supabase-browser";
import BlogItemCard from "@/components/blogPost/BlogItemCard";
import { BlogPost, BlogPostItem } from "@/lib/interface";

interface Props {
  params: {
    slug: string;
  };
}

interface State {
  post: BlogPost | null;
  blogItems: BlogPostItem[] | null;
}

const BlogPostPage = ({ params }: Props) => {
  const [state, setState] = useState<State>({
    post: null,
    blogItems: null,
  });

  const filepath = state.post?.image;

  const { data } = supabase.storage.from("images").getPublicUrl(`${filepath}`);

  useEffect(() => {
    async function fetchData() {
      const { data: post } = await supabase
        .from("blog_post")
        .select("*")
        .eq("slug", params.slug)
        .single();

      if (post) {
        const { data: blogItems } = await supabase
          .from("blog_post_item")
          .select("*")
          .eq("blogPostId", post.id);

        setState({
          post,
          blogItems,
        });
      } else {
        setState({ post: null, blogItems: null });
      }
    }

    fetchData();
  }, [params.slug]);

  return (
    <div className="">
      <img
        src={data.publicUrl || undefined}
        alt={state.post?.title}
        className="w-full h-64 object-cover mt-4 rounded border"
      />
      <h1 className="mt-6 text-5xl font-bold">{state.post?.title}</h1>
      <h2 className="mt-4 text-2xl">{state.post?.subTitle}</h2>
      <p className="mt-3 text-sm">
        Author: {state.post?.user.name} on{" "}
        {state.post?.created_at.toLocaleString().substring(0, 10)}
      </p>

      <div className="mt-6 text-1xl space-y-4">{state.post?.content}</div>
      <div className="divider"></div>
      {state.blogItems?.map((item, index) => (
        <div>
          <BlogItemCard key={index} blogPostItem={item} />
          <div className="divider"></div>
        </div>
      ))}
    </div>
  );
};

export default BlogPostPage;
