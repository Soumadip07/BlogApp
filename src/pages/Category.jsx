import React, { useEffect, useState } from 'react'
import { Loader } from '../components'
import { useDispatch, useSelector } from 'react-redux';
import CategoryList from '../components/Category.jsx';
import { fetchPosts, postLoading } from '../store/postSlice.js';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorHandlerPage from '../components/ErrorHandle/ErrorBoundary.jsx';

function CategoryPage() {
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
    return (
        <ErrorBoundary
            FallbackComponent={ErrorHandlerPage}
            onError={() => console.log("Error happened!")}
        >

            {status === 'loading' ? (
                <div className="flex justify-center w-full" >
                    <Loader />
                </div>
            ) : (
                <div>
                    <CategoryList posts={posts?.documents} />
                </div>
            )}
        </ErrorBoundary>
    )
}

export default CategoryPage
