import React, { useEffect, useState } from 'react'
import { Loader } from '../components'
import { useDispatch, useSelector } from 'react-redux';
import CategoryList from '../components/Category.jsx';
import { fetchPosts, postLoading } from '../store/postSlice.js';

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
        <>
            {status === 'loading' ? (
                <div className="flex justify-center w-full" >
                    <Loader />
                </div>
            ) : (
                <div>
                    <CategoryList posts={posts?.documents} />
                </div>
            )}
        </>
    )
}

export default CategoryPage
