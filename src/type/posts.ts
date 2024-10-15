export interface Post {
  id: number;
  title: string;
  body: string;
  completed: boolean; 
}

type PostState = {
  posts: Post[];
  loading: boolean;
  error: string | null;
};

export const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
};