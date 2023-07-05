import React from "react";
import { getAllPosts, getPostBySlug } from "@/lib/prisma/blogPostData";
import { Metadata } from "next";
import BlogItemCard from "@/components/blogPost/BlogItemCard";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blogPost = await getPostBySlug(params.slug);
  if (!blogPost)
    return {
      title: "Not Found",
      description: "The page is not found",
    };

  return {
    title: blogPost.title,
    description: blogPost.metaDesc,
    alternates: {
      canonical: `/${blogPost.slug}`,
      languages: {
        "en-CA": `en-CA/${blogPost.slug}`,
      },
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  if (!posts) return [];

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

const BlogPostPage = async ({ params }: Props) => {
  const post = await getPostBySlug(params.slug);

  if (post === null)
    return (
      <div className="flex items-center justify-center flex-col">
        <img src="/sad404.ffc1ba45.svg" alt="" />
        <div className="text-4xl font-color-100 pb-32">404 PAGE NOT FOUND</div>
      </div>
    );

  return (
    <div>
      <img
        src={post?.image || undefined}
        alt={post?.title}
        className="w-full h-64 object-cover mt-4 rounded-lg"
      />
      <h1 className="mt-6 text-5xl font-bold">{post?.title}</h1>
      <h2 className="mt-4 text-2xl">{post?.subTitle}</h2>
      <p className="mt-3 text-sm">
        Author: {post?.user.name} on {post?.createdAt.toLocaleString()}
      </p>

      <div className="mt-6 text-1xl space-y-4">{post?.content}</div>
      <div className="divider"></div>

      <div className="flex flex-col pt-5">
        {post.items.map((blogItem, index) => (
          <div key={index}>
            <BlogItemCard blogPostItem={blogItem} />
            <div className="divider"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPostPage;
