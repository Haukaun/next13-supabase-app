"use client";

import React, { useState } from "react";
import supabaseclient from "@/lib/supabaselib/supabase-browser";

type BlogPostItem = {
  id: number;
  title: string;
  content: string;
  subTitle: string;
  subContent: string;
  url_path: string;
};

type BlogModalItemProps = {
  blogPostItemProps: BlogPostItem;
};

export default function BlogEditModal({
  blogPostItemProps,
}: BlogModalItemProps) {
  const [blogPostItem, setblogPostItem] =
    useState<BlogPostItem>(blogPostItemProps);

  const [supabase] = useState(() => supabaseclient);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setblogPostItem({ ...blogPostItem, [e.target.name]: e.target.value });
  };

  const modalId = `my_blogpost_modal_${blogPostItem.id}`;

  const handleSubmit = async () => {
    try {
      await supabase
        .from("blog_post_item")
        .update({
          title: blogPostItem.title,
          content: blogPostItem.content,
          subTitle: blogPostItem.subTitle,
          subContent: blogPostItem.subContent,
          url_path: blogPostItem.url_path,
        })
        .eq("id", blogPostItem.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <label htmlFor={modalId} className="btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          height={"1.2em"}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </label>

      <input type="checkbox" id={modalId} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box flex flex-col">
          <div className="flex flex-col">
            <h3 className="font-bold text-lg pb-5">UPDATE BLOGITEM</h3>
            <div className="gap-10">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-4 w-full"
              >
                <label>
                  Title:
                  <input
                    type="text"
                    name="slug"
                    className="rounded-md p-2 mt-2 w-full border"
                    placeholder={blogPostItem.title}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Content:
                  <input
                    type="text"
                    name="content"
                    className="rounded-md p-2 mt-2 w-full border"
                    placeholder={blogPostItem.content}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Sub-title:
                  <input
                    type="text"
                    name="subTitle"
                    className="rounded-md p-2 mt-2 w-full border"
                    placeholder={blogPostItem.subTitle}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Sub-Content:
                  <textarea
                    name="subContent"
                    className="rounded-md p-2 mt-2 w-full h-40 border"
                    placeholder={blogPostItem.subContent}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  URL:
                  <input
                    type="text"
                    name="url"
                    className="rounded-md p-2 mt-2 w-full border"
                    placeholder={blogPostItem.url_path}
                    onChange={handleChange}
                  />
                </label>
                <input type="submit" value="Submit" className="btn" />
              </form>
            </div>
          </div>
          <div className="modal-action">
            <label htmlFor={modalId} className="btn">
              Close!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
