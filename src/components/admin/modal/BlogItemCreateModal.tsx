"use client";

import supabaseclient from "@/lib/supabaselib/supabase-browser";
import React, { ChangeEvent, useState } from "react";

interface Props {
  blogId: number;
}

interface BlogPostItem {
  blogPostId: number;
  title: string;
  content: string;
  image: File | null;
  subTitle: string;
  url_path: string;
  subContent: string;
}

const initialState = {
  blogPostId: 0,
  title: "",
  content: "",
  image: null,
  subTitle: "",
  url_path: "",
  subContent: "",
};

export default function BlogItemCreateModal({ blogId }: Props) {
  const [blogItem, setBlogItem] = useState<BlogPostItem>(initialState);

  const [supabase] = useState(() => supabaseclient);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBlogItem({ ...blogItem, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBlogItem({ ...blogItem, image: e.target.files[0] });
    }
  };

  const handleSubmit = async () => {
    if (
      !blogItem.title ||
      !blogItem.subTitle ||
      !blogItem.content ||
      !blogItem.url_path ||
      !blogItem.subContent ||
      !blogItem.image
    )
      return;

    try {
      const { image, ...rest } = blogItem;

      const file = blogItem.image;
      const filePath = `blogPostItem/${blogItem.blogPostId}/${file.name}`;

      const { error } = await supabase
        .from("blog_post_item")
        .insert([{ ...rest, blogPostId: blogId, image: filePath }])
        .single();

      if (error) {
        console.log(error);
      }

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (uploadError) {
        console.log(uploadError);
        return;
      }
    } catch (error) {
      console.log(error);
    }
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
                    className="rounded-md p-2 mt-2 w-full border"
                    value={blogItem.content}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Sub-content:
                  <textarea
                    name="subContent"
                    required
                    className="rounded-md p-2 mt-2 w-full border"
                    value={blogItem.subContent}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Link:
                  <input
                    type="text"
                    name="url_path"
                    required
                    className="rounded-md p-2 mt-2 w-full border"
                    value={blogItem.url_path}
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
                    onChange={handleImageChange}
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
}
