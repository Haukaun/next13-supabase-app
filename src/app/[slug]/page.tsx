import React from "react";
import { Metadata } from "next";

import createClient from "@/lib/supabaselib/supabase-server";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("blog_post")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (error) {
    console.log(error);
  }

  if (!data)
    return {
      title: "Not Found",
      description: "The page is not found",
    };

  return {
    title: data.title,
    description: data.metaDesc,
    alternates: {
      canonical: `/${data.slug}`,
      languages: {
        "en-CA": `en-CA/${data.slug}`,
      },
    },
  };
}

const BlogPostPage = async ({ params }: Props) => {
  const supabase = createClient();

  const { data: post } = await supabase
    .from("blog_post")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (post === null)
    return (
      <div className="flex items-center justify-center flex-col">
        <img src="/sad404.ffc1ba45.svg" alt="" />
        <div className="text-4xl font-color-100 pb-32">404 PAGE NOT FOUND</div>
      </div>
    );

  return (
    <div className="">
      <img
        src={post?.image || undefined}
        alt={post?.title}
        className="w-full h-64 object-cover mt-4 rounded-lg"
      />
      <h1 className="mt-6 text-5xl font-bold">{post?.title}</h1>
      <h2 className="mt-4 text-2xl">{post?.subTitle}</h2>
      <p className="mt-3 text-sm">
        Author: {post.user} on {post?.created_at}
      </p>

      <div className="mt-6 text-1xl space-y-4">{post?.content}</div>
      <div className="divider"></div>

      <div className="flex flex-col pt-5"></div>
    </div>
  );
};

export default BlogPostPage;
