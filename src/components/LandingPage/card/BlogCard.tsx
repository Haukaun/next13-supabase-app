interface BlogCardProps {
  blogPost: BlogPost;
}

const BlogCard = ({ blogPost }: BlogCardProps) => {
  const { title, subTitle, slug, image } = blogPost;
  return (
    <div className="card shadow-xl max-w-xs">
      <figure>
        <img src={image || "/testimage.jpeg"} alt={title} />
      </figure>
      <div className="card-body">
        <h1 className="card-title">
          {title}
          <div className="badge badge-secondary">NEW</div>
        </h1>
        <p>{subTitle}</p>

        <a href={"/" + slug} className="btn btn-primary">
          Read more
        </a>
      </div>
    </div>
  );
};

export default BlogCard;
