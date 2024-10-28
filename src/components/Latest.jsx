import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components'
import PostContainer from './container/PostContainer';
function Latest({ posts }) {
    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(() => {
        if (posts?.documents) {
            // Sort the posts by date in descending order (latest first)
            const sortedPosts = [...posts?.documents].sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateB - dateA;
            });

            setFilteredPosts(sortedPosts);
        }
    }, [posts]);
    return (
        <div className='w-full py-8'>
            <PostContainer>
                <div className='flex flex-wrap'>
                    {filteredPosts.map((post) => (
                        <div key={post.$id} className='w-1/4 p-2'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </PostContainer>
        </div>
    );
}

export default Latest;
