import { useSession } from "next-auth/react";
import { useState } from "react";
import { BlogEditModal } from "../modal/BlogEditModal";
import { BlogItemCreateModal } from "../modal/BlogItemCreateModal";

interface Props {
  blogPost: BlogPost;
}

const BlogCardLong = ({ blogPost }: Props) => {
  const { data: session } = useSession();
  const [isDeleted, setIsDeleted] = useState(false);

  async function deleteBlogPost() {
    if (!window.confirm("Are you sure you want to delete this blog post?")) {
      return;
    }

    const res = await fetch("/api/blogPost/delete/" + blogPost.id, {
      method: "DELETE",
      headers: {
        authorization: ` ${session?.user.accessToken}`,
      },
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    } else {
      setIsDeleted(true);
      return await res.json();
    }
  }

  if (isDeleted) return null;

  return (
    <div className="card card-side shadow-xl flex flex-col md:flex-row">
      <figure className="w-full md:w-1/4">
        <a href={"/" + blogPost.slug}>
          <img
            className="object-cover object-center w-full h-full rounded"
            src={blogPost.image || "/testimage.jpeg"}
            alt="Movie"
          />
        </a>
      </figure>
      <div className="card-body flex-1 flex flex-col items-center justify-center md:px-4">
        <div className="max-w-4xl">
          <h2 className="card-title">{blogPost.title}</h2>
          <p>{blogPost.subTitle}</p>
        </div>
      </div>
      <div className="card-actions  md:flex md:justify-center justify-center my-4 items-center md:px-4">
        <div className="flex gap-2 border rounded p-1">
          <a href={"/admin/blogItems/" + blogPost.id} className="btn">
            Items: {blogPost.items.length}
          </a>
          <BlogItemCreateModal blogPostId={blogPost.id} />
        </div>
        <BlogEditModal
          blogPost={{
            id: blogPost.id,
            title: blogPost.title,
            content: blogPost.content,
            slug: blogPost.slug,
            subTitle: blogPost.subTitle,
            metaDesc: blogPost.metaDesc,
          }}
        />
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
