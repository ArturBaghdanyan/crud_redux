import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store/store';
import { createPost, deletePost, fetchPosts, updatePost } from './fetch/fetchItems'; // Updated import for the postSlice
import { AppDispatch } from './store/store';
import { Post } from '../../type/posts';

const TodoList: React.FC = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState(''); // State for post body
    const posts = useSelector((state: RootState) => state.posts.posts); // Adjusted to use posts state
    const loading = useSelector((state: RootState) => state.posts.loading);
    const error = useSelector((state: RootState) => state.posts.error);
    const dispatch = useDispatch<AppDispatch>();

    // Fetch posts when the component mounts
    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setBody(e.target.value);
    };

    const handleAddPost = () => {
        if (title.trim() && body.trim()) {
            dispatch(createPost({ title, body })); 
            setTitle('');
            setBody('');
        }
    };

    const handleDeletePost = (id: number) => {
        dispatch(deletePost(id));
    };

    const handleUpdatePost = (post: Post) => {
        const updatedPost = { ...post, completed: !post.completed };
        dispatch(updatePost(updatedPost));
    };

    return (
        <div>
					<input 
						type="text" 
						placeholder="Post Title" 
						value={title} 
						onChange={handleTitleChange} 
					/>{" "}
					<textarea 
							placeholder="Post Body" 
							value={body} 
							onChange={handleBodyChange} 
					/>{" "}
            <button onClick={handleAddPost}>Add Post</button>{" "}

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            <ul style={{ display: 'flex', flexDirection: 'column', rowGap: '10px' }}>
							{posts.map((post: Post) => (
								<li key={post.id} style={{ listStyleType: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', columnGap: '60px' }}>
									<div>
										<h4 style={{ textDecoration: 
											post.completed ? 'line-through' : 'none' }}
										>
											{post.title}
										</h4>
										<p>{post.body}</p>
									</div>
									<button onClick={() => handleUpdatePost(post)}>
										{post.completed ? 'Undo' : 'Complete'}
									</button>
									<button onClick={() => handleDeletePost(post.id)}>
										Delete
									</button>
								</li>
							))}
            </ul>
        </div>
    );
};

export default TodoList;
