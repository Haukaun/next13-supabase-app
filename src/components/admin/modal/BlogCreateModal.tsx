"use client";

import supabaseclient from "@/lib/supabaselib/supabase-browser";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent } from "react";

interface BlogPost {
  title: string;
  subTitle: string;
  content: string;
  metaDesc: string;
  slug: string;
  image: File | null;
}

const initialState: BlogPost = {
  title: "",
  subTitle: "",
  content: "",
  metaDesc: "",
  slug: "",
  image: null,
};

export default function BlogCreateModal() {
  const [blogPost, setBlogPost] = useState<BlogPost>(initialState);
  const [supabase] = useState(() => supabaseclient);
  const router = useRouter();

  const handleTextChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBlogPost({ ...blogPost, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBlogPost({ ...blogPost, image: e.target.files[0] });
    }
  };

  const handleSubmit = async () => {
    if (
      !blogPost.title ||
      !blogPost.subTitle ||
      !blogPost.content ||
      !blogPost.metaDesc ||
      !blogPost.slug ||
      !blogPost.image
    )
      return;

    console.log(blogPost);

    const { image, ...rest } = blogPost;

    const file = blogPost.image;
    const filePath = `blogPost/${blogPost.slug}/${file.name}`;

    const { data: session } = await supabase.auth.getSession();
    console.log(session);

    const { error: insertError } = await supabase
      .from("blog_post")
      .insert([{ ...rest, user: session.session?.user.id, image: filePath }])
      .single();

    if (insertError) {
      console.log(insertError);
      return;
    }

    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(filePath, file);

    if (uploadError) {
      console.log(uploadError);
      return;
    }

    router.push("/admin");
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
                    onChange={handleTextChange}
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
                    onChange={handleTextChange}
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
                    onChange={handleTextChange}
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
                    onChange={handleTextChange}
                  />
                </label>
                <label>
                  Content:
                  <textarea
                    name="content"
                    required
                    className="rounded-md p-2 mt-2 w-full h-40 border"
                    value={blogPost.content}
                    onChange={handleTextChange}
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
            <label htmlFor="my_modal_5" className="btn">
              Close!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
