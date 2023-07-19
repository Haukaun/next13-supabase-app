export interface User {
  id: string;
  name: string;
  avatar: string;
  role: string;
  userName: string;
}

export interface BlogPostItem {
  id: number;
  title: string;
  content: string;
  blogPostId: number;
  image: string | null;
  subTitle: string;
  url_path: string;
  subContent: string;
}

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  metaDesc: string;
  published: boolean;
  slug: string;
  user: User;
  created_at: Date;
  image: string | null;
  subTitle: string;
}
