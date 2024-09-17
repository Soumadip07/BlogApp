import { createSlice } from "@reduxjs/toolkit";
import appwriteService from "../appwrite/conifg.js";

const initialState = {
    posts: null,
    status: 'idle',
    error: null,
};

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postLoading: (state) => {
            state.status = 'loading';
        },
        getAllPost: (state, action) => {
            state.posts = action.payload;
            state.status = 'succeeded';
        },
        postError: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },
    },
});

export const { getAllPost, postLoading, postError } = postsSlice.actions;

export default postsSlice.reducer;

export const fetchPosts = (limit, currentPage) => async (dispatch) => {
    dispatch(postLoading());
    try {
        const response = await appwriteService.getPosts(limit, currentPage);
        dispatch(getAllPost(response));
    } catch (error) {
        dispatch(postError(error.message));
    }
};
