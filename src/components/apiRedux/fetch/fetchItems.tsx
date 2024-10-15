import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Post, initialState } from "../../../type/posts";

// Fetch all posts (Read)
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts?_limit=10');
    return response.data;
});

// Add a new post (Create)
export const createPost = createAsyncThunk('posts/createPost', async (newPost: { title: string; body: string }) => {
    const response = await axios.post<Post>('https://jsonplaceholder.typicode.com/posts', {
        title: newPost.title,
        body: newPost.body,
        completed: false,
    });
    return response.data;
});

// Update a post (Update)
export const updatePost = createAsyncThunk('posts/updatePost', async (updatedPost: Post) => {
    const response = await axios.put<Post>(`https://jsonplaceholder.typicode.com/posts/${updatedPost.id}`, updatedPost);
    return response.data;
});

// Delete a post (Delete)
export const deletePost = createAsyncThunk('posts/deletePost', async (id: number) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    return id;
});

// Define the post slice
const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Handle fetchPosts (Read)
        builder.addCase(fetchPosts.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
            state.loading = false;
            state.posts = action.payload;
        });
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch posts';
        });

        // Handle createPost (Create)
        builder.addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
            state.posts.push(action.payload);
        });

        // Handle updatePost (Update)
        builder.addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
            const index = state.posts.findIndex(post => post.id === action.payload.id);
            if (index !== -1) {
                state.posts[index] = action.payload;
            }
        });

        // Handle deletePost (Delete)
        builder.addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
            state.posts = state.posts.filter(post => post.id !== action.payload);
        });
    },
});

export default postSlice.reducer;
