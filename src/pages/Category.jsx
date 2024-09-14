import React, { useEffect, useState } from 'react'
import { Loader } from '../components'
import appwriteService from "../appwrite/conifg.js";
import { useSelector } from 'react-redux';
import CategoryList from '../components/Category.jsx';

function CategoryPage() {
    // const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const postData = useSelector((state) => state.posts?.posts?.documents || []);
    // useEffect(() => {
    //     appwriteService.getPosts().then((posts) => {
    //         if (posts) {
    //             setPosts(posts.documents)
    //         }
    //         setLoading(false)
    //     })
    // }, [])
    useEffect(() => {
        setLoading(false)
    }, [postData]);
    return (
        <>
            {loading ? (
                <div className="flex justify-center w-full" >
                    <Loader />
                </div>
            ) : (
                <div>
                    <CategoryList posts={postData} />
                </div>
            )}
        </>
    )
}

export default CategoryPage
