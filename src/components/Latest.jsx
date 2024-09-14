import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components'
import { useSelector } from 'react-redux';
function Latest({ posts }) {
    const postData = useSelector((state) => state.posts?.posts || []);
    // console.log(postData?.documents, " ===?", posts)
    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(() => {
        if (postData?.documents) {
            // Sort the posts by date in descending order (latest first)
            const sortedPosts = [...postData.documents].sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateB - dateA;
            });

            setFilteredPosts(sortedPosts);
        }
    }, [postData]);
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
