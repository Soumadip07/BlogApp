import React, { useEffect, useState } from 'react'
// import { Container, PostCard } from '../components'
import { useSelector } from 'react-redux';
import Container from '../container/Container';
import PostCard from '../PostCard';
import NoDataPage from '../NoData';
function UserPosts({ posts }) {
    const postData = useSelector((state) => state.posts?.posts || []);
    const authData = useSelector((state) => state.auth.userData)

    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(() => {
        if (postData?.documents) {
            // Sort the posts by date in descending order (latest first)
            const sortedPosts = postData?.documents?.filter((post) => post.userId === authData?.$id)
            // console.log(sortedPosts)
            setFilteredPosts(sortedPosts);
        }
    }, [postData]);
    return (
        <>
            {filteredPosts.length ? (
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
            ) : (
                <Container>
                    <NoDataPage />
                </Container>
            )}
        </>
    );
}

export default UserPosts;
