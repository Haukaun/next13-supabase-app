import { BlogPostItem } from "@/lib/interface";
import React from "react";
import supabase from "@/lib/supabaselib/supabase-browser";

interface BlogPostItemProps {
  blogPostItem: BlogPostItem;
}

export default function BlogItemCard({ blogPostItem }: BlogPostItemProps) {
  const filepath = blogPostItem.image;

  const { data } = supabase.storage.from("images").getPublicUrl(`${filepath}`);

  return (
    <div>
      <h1 className="my-6 text-4xl font-bold">{blogPostItem.title}</h1>
      <div className="card md:card-side rounded card-compact bg-base-100 shadow-xl border flex-wrap justify-center items-center">
        <figure className="w-full md:w-1/3 ">
          <img
            src={data.publicUrl}
            alt="Movie"
            className="object-cover object-center w-full h-full rounded border-r max-h-64"
            style={{ minHeight: "16rem" }}
          />
        </figure>
        <div className="card-body w-full md:w-0 flex-rox sm:flex-col items-start justify-start">
          <h2 className="card-title">{blogPostItem.subTitle}</h2>
          <p className="max-w-sm">{blogPostItem.subContent}</p>
          <div className="card-actions md:justify-end w-full">
            <a href={blogPostItem.url_path} className="btn btn-primary">
              Watch
            </a>
          </div>
        </div>
      </div>
      <p className="my-10">{blogPostItem.content}</p>
    </div>
  );
}
