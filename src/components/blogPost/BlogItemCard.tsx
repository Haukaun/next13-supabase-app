import React from "react";

interface BlogPostItemProps {
  blogPostItem: BlogPostItem;
}

export default function BlogItemCard({ blogPostItem }: BlogPostItemProps) {
  return (
    <div>
      <h1 className="my-6 text-4xl font-bold">{blogPostItem.title}</h1>
      <div className="card md:card-side card-compact bg-base-100 shadow-xl border flex-wrap justify-center items-center">
        <figure className="w-full md:w-1/3">
          <img src="/testimage.jpeg" alt="Movie" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{blogPostItem.subTitle}</h2>
          <p className="max-w-sm">{blogPostItem.subContent}</p>
          <div className="card-actions justify-end">
            <a href={blogPostItem.urlPath} className="btn btn-primary">
              Watch
            </a>
          </div>
        </div>
      </div>
      <p className="my-10">{blogPostItem.content}</p>
    </div>
  );
}
