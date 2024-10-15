export interface Post {
  id: number;
  title: string;
  body: string;
  completed: boolean; // Optional if needed, assuming it's similar to 'Todo'
}

// Define the state type
type PostState = {
  posts: Post[];
  loading: boolean;
  error: string | null;
};

// Define the initial state
export const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
};