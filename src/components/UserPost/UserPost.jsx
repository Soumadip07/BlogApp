import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Container from '../container/Container';
import PostCard from '../PostCard';
import NoDataPage from '../NoData';
import { useErrorBoundary } from 'react-error-boundary';

function UserPosts({ posts }) {
    const postData = useSelector((state) => state.posts?.posts || []);
    const authData = useSelector((state) => state.auth.userData);
    const { showBoundary } = useErrorBoundary();

    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(() => {
        try {
            if (!postData?.documents) {
                // Simulate an error if there's no post data (you can customize this error as needed)
                throw new Error('No post data available!');
            }
            // Sort the posts by date in descending order (latest first)
            const sortedPosts = posts?.documents?.filter(
                (post) => post.userId === authData?.$id
            );
            setFilteredPosts(sortedPosts);
        } catch (error) {
            // Catch the error and pass it to showBoundary to trigger ErrorBoundary
            showBoundary(error);
        }
    }, [posts, showBoundary, authData]);
    console.log(filteredPosts)

    return (
        <>
            {filteredPosts.length ? (
                <div className="w-full py-8">
                    <Container>
                        <div className="flex flex-wrap">
                            {filteredPosts.map((post) => (
                                <div key={post.$id} className="w-1/4 p-2">
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
