import React, { useEffect, useState } from 'react'
import { Category } from '../components'
import { Loader } from '../components'
import appwriteService from "../appwrite/conifg.js";
import { useSelector } from 'react-redux';

function CategoryPage() {
    // const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const posts = useSelector((state) => state.auth.postData);
    // useEffect(() => {
    //     appwriteService.getPosts().then((posts) => {
    //         if (posts) {
    //             setPosts(posts.documents)
    //         }
    //         setLoading(false)
    //     })
    // }, [])
    console.log(posts)
    return (
        <>
            {loading ? (
                <div className="flex justify-center w-full" >
                    <Loader />
                </div>
            ) : (
                <div>
                    <Category posts={posts} />
                </div>
            )}
        </>
    )
}

export default CategoryPage
