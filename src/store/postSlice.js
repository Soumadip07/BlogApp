import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [{ id: 1, text: "Hello world" }]
}

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        getPosts: (state, action) => {
            state.status = true;
            state.postData = action.payload.postData;
        },
        addPost: (state, action) => {
            state.posts.push(action.payload.post); // Add new post to the state
        },
        // logout: (state) => {
        //     state.status = false;
        //     state.userData = null;
        // }
    }
})

export const { getPosts, addPost } = postsSlice.actions;

export default postsSlice.reducer;