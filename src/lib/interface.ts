export interface User {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

export interface BlogPostItem {
  id: number;
  title: string;
  content: string;
  blogpostId: number;
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
  userId: number;
  createdAt: Date;
  image: string | null;
  subTitle: string;
}
