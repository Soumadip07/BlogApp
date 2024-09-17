import React, { useEffect, useState } from 'react'
import { UserPosts } from '../components'
import { Loader } from '../components'
import ErrorHandlerPage from '../components/ErrorHandle/ErrorBoundary.jsx';
import { ErrorBoundary } from 'react-error-boundary';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, postLoading } from '../store/postSlice.js';

function UserPostPage() {
    const dispatch = useDispatch();
    const { posts, status } = useSelector((state) => state.posts || []);
    const [limit, setLimit] = useState(25);
    const storedLimit = localStorage.getItem("limits");
    if (!storedLimit) {
        localStorage.setItem("limits", limit)
    }
    useEffect(() => {
        if (!posts || posts.length === 0 || (storedLimit != limit)) {
            dispatch(postLoading());
            dispatch(fetchPosts(limit));
            localStorage.setItem("limits", limit)
        }
    }, [limit, posts]);
    // console.log(posts)
    return (
        <ErrorBoundary
            FallbackComponent={ErrorHandlerPage}
            onError={() => console.log("Error happened!")}
        >
            <div>
                <UserPosts posts={posts} />
            </div>
        </ErrorBoundary>
    )
}

export default UserPostPage
