"use client";

import React, { useEffect, useState } from "react";
import supabase from "@/lib/supabaselib/supabase-browser";
import BlogItemCard from "@/components/blogPost/BlogItemCard";
import { BlogPost, BlogPostItem, User } from "@/lib/interface";

interface Props {
  params: {
    slug: string;
  };
}

interface State {
  post: BlogPost | null;
  userProfile: User | null;
  blogItems: BlogPostItem[] | null;
}

const BlogPostPage = ({ params }: Props) => {
  const [state, setState] = useState<State>({
    post: null,
    userProfile: null,
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

        const { data: userProfile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", post.user);

        setState({
          post,
          userProfile: userProfile ? userProfile[0] : null,
          blogItems,
        });
      } else {
        setState({ post: null, userProfile: null, blogItems: null });
      }
    }

    fetchData();
  }, [params.slug]);

  return (
    <main className="">
      <figure>
        <img
          src={data.publicUrl || undefined}
          alt={state.post?.title}
          className="w-full h-64 object-cover mt-4 rounded border"
        />
      </figure>

      <header>
        <h1 className="mt-6 text-5xl font-bold">{state.post?.title}</h1>
        <h2 className="mt-4 text-2xl">{state.post?.subTitle}</h2>
        <p className="mt-3 text-sm flex items-center gap-3">
          <img
            src={"https://github.com/" + state.userProfile?.userName + ".png"}
            className="rounded-full w-10 h-10"
            alt=""
          />
          {state.userProfile?.name} on{" "}
          {state.post?.created_at.toLocaleString().substring(0, 10)}
        </p>
      </header>

      <article className="mt-6 text-1xl space-y-4">
        {state.post?.content}
      </article>

      <div className="divider"></div>

      {state.blogItems?.map((item, index) => (
        <section key={index}>
          <BlogItemCard blogPostItem={item} />
          <div className="divider"></div>
        </section>
      ))}
    </main>
  );
};

export default BlogPostPage;
