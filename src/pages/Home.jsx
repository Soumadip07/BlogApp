import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/conifg.js";
import { Container, Loader, PostCard } from '../components'
import ErrorBoundary from '../components/ErrorHandler.jsx';

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await appwriteService.getPosts()
                if (response) {
                    setPosts(response.documents)
                }

            } catch (error) {
                console.error("Failed to fetch posts:", error)
            } finally {
                setLoading(false) // Ensure loading is set to false regardless of success or failure
            }
        }

        fetchPosts()
    }, [])

    if (loading) {
        return (
            <ErrorBoundary>
                <div className="w-full py-8 mt-4 text-center">
                    <Container>
                        <div className="flex justify-center w-full">
                            <Loader />
                        </div>
                    </Container>
                </div>
            </ErrorBoundary>
        )
    }

    if (posts.length === 0) {
        return (
            <ErrorBoundary>
                <div className="w-full py-8 mt-4 text-center">
                    <Container>
                        <div className="flex flex-wrap">
                            <div className="w-full p-2">
                                <h1 className="text-2xl font-bold hover:text-gray-500">
                                    Login to read posts
                                </h1>
                            </div>
                        </div>
                    </Container>
                </div>
            </ErrorBoundary>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='w-1/4 p-2'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
