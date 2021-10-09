export interface Posts {
  ok: boolean;
  page: number;
  posts: Post[];
}

export interface Post {
  img?: string[];
  _id?: string;
  message?: string;
  coords?: string;
  user?: User;
  created?: string;
}

export interface User {
  avatar?: string;
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
}
