import { useSession } from "next-auth/react";
import React, { useState } from "react";

type BlogItemModalProps = {
  blogPostItem: BlogPostItem;
};

export const BlogItemEditModal: React.FC<BlogItemModalProps> = ({
  blogPostItem,
}) => {
  const [title, setTitle] = useState(blogPostItem.title);
  const [content, setContent] = useState(blogPostItem.content);
  const [subTitle, setSubTitle] = useState(blogPostItem.subTitle);
  const [url, setUrl] = useState(blogPostItem.urlPath);
  const [isEditted, setIsEditted] = useState(false);

  const modalId = `my_blogitempost_modal_${blogPostItem.id}`;

  const { data: session } = useSession();

  const handleSubmit = async () => {
    const res = await fetch(
      "/api/blogPost/blogPostItem/update/" + blogPostItem.id,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: ` ${session?.user.accessToken}`,
        },
        body: JSON.stringify({
          title,
          subTitle,
          content,
          url,
        }),
      }
    );

    if (!res.ok) {
      throw new Error(res.statusText);
    } else {
      setIsEditted(true);
      return await res.json();
    }
  };
  if (isEditted) {
    location.reload();
  }

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
            <h3 className="font-bold text-lg pb-5">UPDATE BLOGPOSTITEM</h3>
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
                    className="rounded-md p-2 mt-2 w-full border"
                    placeholder={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </label>
                <label>
                  Sub-title:
                  <input
                    type="text"
                    name="subTitle"
                    className="rounded-md p-2 mt-2 w-full border"
                    placeholder={subTitle}
                    onChange={(e) => setSubTitle(e.target.value)}
                  />
                </label>
                <label>
                  Content:
                  <textarea
                    name="content"
                    className="rounded-md p-2 mt-2 w-full h-40 border"
                    placeholder={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </label>
                <label>
                  Url Path:
                  <input
                    type="text"
                    name="content"
                    className="rounded-md p-2 mt-2 w-full border"
                    placeholder={url}
                    onChange={(e) => setUrl(e.target.value)}
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
};
