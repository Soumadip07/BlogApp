import React, { useState, useEffect } from 'react'
import { Container, Loader, PostCard } from '../components'
import appwriteService from "../appwrite/conifg.js";
import { useDispatch, useSelector } from 'react-redux';
import { getAllPost } from '../store/postSlice.js';
import Pagination from '../components/Pagination.jsx';

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const [limit, setLimit] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * limit;
    const indexOfFirstItem = indexOfLastItem - limit;
    const currentItems = posts?.documents?.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(posts?.total / limit)


    // useEffect(() => {
    //     appwriteService.getPosts().then((posts) => {
    //         if (posts) {
    //             setPosts(posts.documents)
    //             
    //         }
    //         setLoading(false)
    //     })
    // }, [])
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await appwriteService.getPosts();
                if (response) {
                    setPosts(response);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
            setLoading(false);
        };

        fetchPosts();
    }, []);

    // const handleShowMore = () => {
    //     setLimit((prevLimit) => prevLimit + 2); // Increase limit to show more posts
    // };

    return (
        <div className='w-full py-8'>
            <Container>
                {loading ? (
                    <div className="flex justify-center w-full">
                        <Loader />
                    </div>
                ) : (
                    <div className='flex flex-wrap'>
                        {currentItems?.map((post) => (
                            <div key={post.$id} className='w-1/4 p-2'>
                                <PostCard {...post} />
                            </div>
                        ))}
                        {/* {!allPostsLoaded && (
                            <div className='flex justify-center w-full mt-4'>
                                <button
                                    className='px-4 py-2 text-white bg-blue-500 rounded'
                                    onClick={handleShowMore}
                                >
                                    Show More
                                </button>
                            </div>
                        )} */}
                    </div>
                )}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                >
                </Pagination>
            </Container>
        </div>
    )
}

export default AllPosts
