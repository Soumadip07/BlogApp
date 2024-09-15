import React, { useEffect, useState } from 'react'
import { Latest, UserPosts } from '../components'
import { Loader } from '../components'
import appwriteService from "../appwrite/conifg.js";
import ErrorHandlerPage from '../components/ErrorHandle/ErrorBoundary.jsx';
import { ErrorBoundary } from 'react-error-boundary';

function UserPostPage() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
            setLoading(false)
        })
    }, [])
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
