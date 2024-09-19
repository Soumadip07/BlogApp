import React, { useEffect, useState } from 'react'
import { Container, Loader, PostCard } from '../components'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, postLoading } from '../store/postSlice.js';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorHandlerPage from '../components/ErrorHandle/ErrorBoundary.jsx';
import Hero from '../components/Hero.jsx';

function Home() {
    const { posts, status } = useSelector((state) => state.posts || []);
    const dispatch = useDispatch()
    const storedLimit = localStorage.getItem("limits");
    const [limit, setLimit] = useState(25);
    if (!storedLimit) {
        localStorage.setItem("limits", limit)
    }
    if (!posts) {
        dispatch(postLoading());
        dispatch(fetchPosts(limit));
    }
    useEffect(() => {
        if (!posts || posts.length === 0 || (storedLimit != limit)) {
            dispatch(postLoading());
            dispatch(fetchPosts(limit));
            localStorage.setItem("limits", limit)
        }
    }, [limit, posts]);
    if (status === 'loading') {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex justify-center w-full">
                        <Loader />
                    </div>
                </Container>
            </div>
        )
    }

    if (posts?.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <Hero />
                    <div className="flex flex-wrap">
                        <div className="w-full p-2">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <ErrorBoundary
            FallbackComponent={ErrorHandlerPage}
            onError={() => console.log("Error happened!")}
        >
            <Hero />
            <div className='w-full py-8'>
                <Container>
                    {/* <div className='flex flex-wrap'>
                        {posts?.documents?.map((post) => (
                            <div key={post.$id} className='w-1/4 p-2'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div> */}
                </Container>
            </div>
        </ErrorBoundary>
    )
}

export default Home
