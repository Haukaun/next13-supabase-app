import React from "react";
import createClient from "@/lib/supabaselib/supabase-server";

interface Props {
  params: {
    id: number;
  };
}

const BlogPostItemPage = async ({ params }: Props) => {
  const supabase = createClient();

  const { data: BlogPostItems, error } = await supabase
    .from("blog_post_item")
    .select("*")
    .eq("blogPostId", params.id);

  console.log(params.id);

  if (error) {
    console.log(error);
    return;
  }

  return (
    <div className="flex justify-center items-center flex-col gap-3 w-full">
      <a href="/admin" className="hover:text-base-300 underline">
        {"<- back to Admin panel"}
      </a>
      <h1>Blog Items</h1>
      {BlogPostItems.map((blogItem) => (
        <div>{blogItem.content}</div>
      ))}
    </div>
  );
};

export default BlogPostItemPage;
