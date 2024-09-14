import { nanoid, createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],  // An array to hold post objects
};
const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        addPost: (state, action) => {
            const newPost = {
                id: nanoid(),  // Generating a unique ID for each post
                ...action.payload,  // Merging the post data
            };
            state.posts.push(newPost); // Adding the new post to the array
        },
        getAllPost: (state, action) => {
            state.posts = action.payload;  // Store fetched posts in state
            state.status = 'succeeded';  // Mark status as succeeded after fetching posts
        },
        postLoading: (state) => {
            state.status = 'loading'; // Set status to 'loading' when fetching posts
        },
        postError: (state, action) => {
            state.status = 'failed';  // Set status to 'failed' in case of error
            state.error = action.payload; // Capture the error message
        },
        // Additional reducers can be added as needed
    }
});

export const { addPost, getAllPost, postLoading, postError } = postsSlice.actions;

export default postsSlice.reducer;
