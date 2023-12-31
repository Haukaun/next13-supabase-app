import { BlogPost } from "@/lib/interface";
import createclient from "@/lib/supabaselib/supabase-server";

interface BlogCardProps {
  blogPost: BlogPost;
}

const BlogCard = ({ blogPost }: BlogCardProps) => {
  const { title, slug } = blogPost;

  const supabase = createclient();

  const filepath = blogPost.image;

  const { data } = supabase.storage.from("images").getPublicUrl(`${filepath}`);

  return (
    <div className="relative mb-4  before:rounded-md before:absolute before:inset-0 before:bg-black before:bg-opacity-20 max-w-sm mx-auto">
      <img
        className="w-full rounded max-h-96 object-cover"
        src={data.publicUrl}
        style={{ minHeight: "12rem" }}
      />
      <div className="absolute inset-0 p-4 text-white flex flex-col w-full">
        <div className="relative p-2">
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        <div className="mt-auto">
          <a
            href={slug}
            className="bg-primary py-1 px-4 rounded-md text-white font-bold"
          >
            READ
          </a>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
