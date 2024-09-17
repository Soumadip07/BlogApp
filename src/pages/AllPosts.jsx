import React, { useEffect, useState } from 'react';
import { Container, Loader, PostCard } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, getAllPost, postLoading } from '../store/postSlice';
import Pagination from '../components/Pagination.jsx';

function AllPosts() {
    const dispatch = useDispatch();
    const postData = useSelector((state) => state.posts?.posts || []);

    const { posts, status } = useSelector((state) => state.posts || []);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(8);

    const totalPages = Math.ceil(posts?.total / limit);

    useEffect(() => {
        if (!posts || posts.length === 0) {
            dispatch(postLoading());
            dispatch(fetchPosts(limit, currentPage));
        }
    }, [limit, currentPage, posts]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        dispatch(fetchPosts(limit, newPage));
    };

    return (
        <div className='w-full py-8'>
            <Container>
                {status === 'loading' ? (
                    <div className="flex justify-center w-full">
                        <Loader />
                    </div>
                ) : (
                    <div className='flex flex-wrap'>
                        {posts?.documents?.map((post) => (
                            <div key={post.$id} className='w-1/4 p-2'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                )}
                {posts?.documents?.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </Container>
        </div>
    );
}

export default AllPosts;
