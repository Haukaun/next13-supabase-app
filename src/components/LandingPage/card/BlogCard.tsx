import { BlogPost } from "@/lib/interface";

interface BlogCardProps {
  blogPost: BlogPost;
}

const BlogCard = ({ blogPost }: BlogCardProps) => {
  const { title, subTitle, slug, image } = blogPost;
  return (
    <div className="relative mb-4 before:content-[''] before:rounded-md before:absolute before:inset-0 before:bg-black before:bg-opacity-20">
      <img className="w-full rounded-md" src={image || "/testimage.jpeg"} />
      <div className="absolute inset-0 p-8 text-white flex flex-col">
        <div className="relative">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="font-sm font-light">{subTitle}</p>
        </div>
        <div className="mt-auto">
          <a
            href={slug}
            className=" bg-white bg-opacity-60 py-1 px-4 rounded-md text-black"
          >
            READ
          </a>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
