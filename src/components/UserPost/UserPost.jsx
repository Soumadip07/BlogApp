import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Container from '../container/Container';
import PostCard from '../PostCard';
import NoDataPage from '../NoData';
import { useErrorBoundary } from 'react-error-boundary';

function UserPosts({ posts }) {
    const authData = useSelector((state) => state.auth.userData);
    const { showBoundary } = useErrorBoundary();

    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(() => {
        try {

            const sortedPosts = posts?.documents?.filter(
                (post) => post.userId === authData?.$id
            );
            setFilteredPosts(sortedPosts);
        } catch (error) {
            // Catch the error and pass it to showBoundary to trigger ErrorBoundary
            showBoundary(error);
        }
    }, [posts, showBoundary, authData]);

    return (
        <>
            {filteredPosts?.length ? (
                <div className="w-full py-8">
                    <Container>
                        <div className="flex flex-wrap">
                            {filteredPosts?.map((post) => (
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
