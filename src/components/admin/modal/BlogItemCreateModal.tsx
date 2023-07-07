"use client";

import supabase from "@/lib/supabaselib/supabase-browser";
import React, { useState } from "react";

interface Props {
  blogPostId: number;
}

export const BlogItemCreateModal = ({ blogPostId }: Props) => {
  const [blogItem, setBlogItem] = useState({
    title: "",
    subTitle: "",
    content: "",
    urlPath: "",
    subContent: "",
    image: "/testimage.jpeg",
  });

  console.log(blogPostId);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBlogItem({ ...blogItem, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (
      !blogItem.title ||
      !blogItem.subTitle ||
      !blogItem.content ||
      !blogItem.urlPath ||
      !blogItem.subContent
    )
      return;

    await supabase
      .from("blog_post_item") // replace this with the correct table name in your database
      .insert([
        {
          ...blogItem,
          blogPost: blogPostId,
        },
      ])
      .single();
  };

  return (
    <div>
      <label htmlFor="my_modal_4" className="btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          height={"1.2em"}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </label>

      <input type="checkbox" id="my_modal_4" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box flex flex-col">
          <div className="flex flex-col">
            <h3 className="font-bold text-lg pb-5">Create Blog Item</h3>
            <div className="gap-10">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-4 w-full"
              >
                <label>
                  Title:
                  <input
                    type="text"
                    name="title"
                    required
                    className="rounded-md p-2 mt-2 w-full border"
                    value={blogItem.title}
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
                    value={blogItem.subTitle}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Content:
                  <textarea
                    name="content"
                    required
                    className="rounded-md p-2 mt-2 w-full h-40 border"
                    value={blogItem.content}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Sub-content:
                  <textarea
                    name="subContent"
                    required
                    className="rounded-md p-2 mt-2 w-full h-40 border"
                    value={blogItem.subContent}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Link:
                  <input
                    type="text"
                    name="urlPath"
                    required
                    className="rounded-md p-2 mt-2 w-full border"
                    value={blogItem.urlPath}
                    onChange={handleChange}
                  />
                </label>
                <input type="submit" value="Submit" className="btn" />
              </form>
            </div>
          </div>
          <div className="modal-action">
            <label htmlFor="my_modal_4" className="btn">
              Close!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
