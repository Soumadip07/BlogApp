import React, { useEffect, useState } from 'react'
import { Latest } from '../components'
import { Loader } from '../components'
import appwriteService from "../appwrite/conifg.js";

function LatestPage() {
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
        <>
            {loading ? (
                <div className="flex justify-center w-full" >
                    <Loader />
                </div>
            ) : (
                <div>
                    <Latest posts={posts} />
                </div>
            )}
        </>
    )
}

export default LatestPage
