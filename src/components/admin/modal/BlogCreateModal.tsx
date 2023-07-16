"use client";

import supabaseclient from "@/lib/supabaselib/supabase-browser";
import React, { useState } from "react";

interface BlogPost {
  title: string;
  subTitle: string;
  content: string;
  metaDesc: string;
  slug: string;
  image: string;
}

const initialState = {
  title: "",
  subTitle: "",
  content: "",
  metaDesc: "",
  slug: "",
  image: "/testimage.jpeg",
};

export default function BlogCreateModal() {
  const [blogPost, setBlogPost] = useState<BlogPost>(initialState);

  const [supabase] = useState(() => supabaseclient);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBlogPost({ ...blogPost, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (
      !blogPost.title ||
      !blogPost.subTitle ||
      !blogPost.content ||
      !blogPost.metaDesc ||
      !blogPost.slug
    )
      return;
    const { data: session } = await supabase.auth.getSession();
    await supabase
      .from("blog_post")
      .insert([{ ...blogPost, user: session.session?.user.id }])
      .single();
  };

  return (
    <div>
      <label htmlFor="my_modal_5" className="btn">
        Create new blogpost
      </label>

      <input type="checkbox" id="my_modal_5" className="modal-toggle" />

      <div className="modal">
        <div className="modal-box flex flex-col">
          <div className="flex flex-col">
            <h3 className="font-bold text-lg pb-5">CREATE BLOGPOST</h3>
            <div className="gap-10">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-4 w-full"
              >
                <label>
                  Slug:
                  <input
                    type="text"
                    name="slug"
                    required
                    className="rounded-md p-2 mt-2 w-full border"
                    value={blogPost.slug}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Title:
                  <input
                    type="text"
                    name="title"
                    required
                    className="rounded-md p-2 mt-2 w-full border"
                    value={blogPost.title}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  MetaData:
                  <input
                    type="text"
                    name="metaDesc"
                    required
                    className="rounded-md p-2 mt-2 w-full border"
                    value={blogPost.metaDesc}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Sub-title:
                  <input
                    type="text"
                    name="subTitle"
                    required
                    className="rounded-md p-2 mt-2 w-full border"
                    value={blogPost.subTitle}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Content:
                  <textarea
                    name="content"
                    required
                    className="rounded-md p-2 mt-2 w-full h-40 border"
                    value={blogPost.content}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Image:
                  <input
                    name="image"
                    required
                    type="file"
                    className="file-input file-input-bordered w-full"
                  />
                </label>

                <input type="submit" value="Submit" className="btn" />
              </form>
            </div>
          </div>
          <div className="modal-action">
            <label htmlFor="my_modal_5" className="btn">
              Close!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
