import React, { useEffect, useState } from 'react'
import { Latest, UserPosts } from '../components'
import { Loader } from '../components'
import appwriteService from "../appwrite/conifg.js";

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
        <div>
            <UserPosts posts={posts} />
        </div>
    )
}

export default UserPostPage
