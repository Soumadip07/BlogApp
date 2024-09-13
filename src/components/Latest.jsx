import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components'
function Latest({ posts }) {

    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(() => {
        const sortedPosts = [...posts].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA;
        });

        setFilteredPosts(sortedPosts);
    }, [posts]);
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {filteredPosts.map((post) => (
                        <div key={post.$id} className='w-1/4 p-2'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Latest;
