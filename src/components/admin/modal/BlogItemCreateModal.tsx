import { useSession } from "next-auth/react";
import React, { useState } from "react";

interface Props {
  blogPostId: number;
}

export const BlogItemCreateModal = ({ blogPostId }: Props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [urlPath, setUrlPath] = useState("");
  const [subContent, setSubContent] = useState("");

  const { data: session } = useSession();

  const handleSubmit = async () => {
    const response = await fetch("/api/blogPost/addBlogItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: ` ${session?.user.accessToken}`,
      },
      body: JSON.stringify({
        title,
        subTitle,
        content,
        blogpostId: blogPostId,
        urlPath,
        subContent,
        userId: session?.user.id,
        image: "/testimage.jpeg",
      }),
    });

    if (response.ok) {
      // handle success
    } else {
      // handle error
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
                    name="slug"
                    required
                    className="rounded-md p-2 mt-2 w-full border"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </label>
                <label>
                  Sub-title:
                  <input
                    type="text"
                    name="subTitle"
                    required
                    className="rounded-md p-2 mt-2 w-full border"
                    value={subTitle}
                    onChange={(e) => setSubTitle(e.target.value)}
                  />
                </label>
                <label>
                  Content:
                  <textarea
                    name="content"
                    required
                    className="rounded-md p-2 mt-2 w-full h-40 border"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </label>
                <label>
                  Sub-content:
                  <textarea
                    name="content"
                    required
                    className="rounded-md p-2 mt-2 w-full h-40 border"
                    value={subContent}
                    onChange={(e) => setSubContent(e.target.value)}
                  />
                </label>
                <label>
                  Link:
                  <input
                    type="text"
                    name="title"
                    required
                    className="rounded-md p-2 mt-2 w-full border"
                    value={urlPath}
                    onChange={(e) => setUrlPath(e.target.value)}
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
