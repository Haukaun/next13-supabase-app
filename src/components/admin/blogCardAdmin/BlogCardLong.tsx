"use client";

import { useState } from "react";
import supabaseclient from "@/lib/supabaselib/supabase-browser";
import { BlogPost } from "@/lib/interface";
import BlogItemCreateModal from "../modal/BlogItemCreateModal";
import BlogEditModal from "../modal/BlogEditModal";

interface Props {
  blogPost: BlogPost;
}

const BlogCardLong = ({ blogPost }: Props) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [supabase] = useState(() => supabaseclient);

  const filePathBlogPost = blogPost.image;

  const { data } = supabase.storage
    .from("images")
    .getPublicUrl(`${filePathBlogPost}`);

  const deleteBlogPost = async () => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) {
      return;
    }

    if (blogPost.image) {
      // Attempt to delete the blogPost image first
      const { error: deleteImageError } = await supabase.storage
        .from("images")
        .remove([blogPost.image]);

      if (deleteImageError) {
        console.log("Error deleting image:", deleteImageError);
        return;
      }

      // List all files in the directory
      const { data: fileList, error: listError } = await supabase.storage
        .from("images")
        .list("blogPostItem/" + blogPost.id);

      if (listError) {
        console.log("Error listing files:", listError);
        return;
      }

      // Delete each file in the directory
      for (let file of fileList) {
        const { error: deleteFileError } = await supabase.storage
          .from("images")
          .remove(["blogPostItem/" + blogPost.id + "/" + file.name]);
        if (deleteFileError) {
          console.log("Error deleting file:", deleteFileError);
          return;
        }
      }
    }

    // If image deletion was successful, delete the blog post
    const { error: deletePostError } = await supabase
      .from("blog_post")
      .delete()
      .eq("id", blogPost.id);

    if (deletePostError) {
      console.log("Error deleting blog post:", deletePostError);
      return;
    }

    setIsDeleted(true);
  };

  if (isDeleted) return null;

  return (
    <div className="card card-side shadow-xl flex-col md:flex-row md:max-h-32 h-full border">
      <figure className="w-full md:w-1/4">
        <a href={"/" + blogPost.slug}>
          <img
            className="object-cover object-center w-full h-full border-r"
            src={data.publicUrl || "/testimage.jpeg"}
            alt={blogPost.title}
          />
        </a>
      </figure>

      <div className="card-body flex-1 flex flex-col items-start justify-center md:px-4">
        <div className="max-w-4xl">
          <h2 className="card-title">{blogPost.title}</h2>
          <p>{blogPost.subTitle}</p>
        </div>
      </div>

      <div className="card-actions md:flex md:justify-center justify-center my-4 items-center md:px-4">
        <div className="flex gap-2 border rounded p-1">
          <a href={"/admin/blogItems/" + blogPost.id} className="btn">
            Items
          </a>
          <BlogItemCreateModal blogId={blogPost.id} />
        </div>
        <BlogEditModal blogPostProps={blogPost} />
        <button onClick={deleteBlogPost} className="btn btn-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height={"1.2em"}
            viewBox="0 0 448 512"
          >
            <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BlogCardLong;
