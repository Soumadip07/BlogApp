import React, { useEffect, useState } from 'react';
import { Container, Loader, PostCard } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, getAllPost, postLoading } from '../store/postSlice';
import Pagination from '../components/Pagination.jsx';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorHandlerPage from '../components/ErrorHandle/ErrorBoundary.jsx';

function AllPosts() {
    const dispatch = useDispatch();
    const { posts, status } = useSelector((state) => state.posts || []);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(8);


    const totalPages = Math.ceil(posts?.total / limit);
    const storedLimit = localStorage.getItem("limits");
    if (!storedLimit) {
        localStorage.setItem("limits", limit)
    }
    useEffect(() => {
        if (!posts || posts.length === 0 || (storedLimit != limit)) {
            dispatch(postLoading());
            dispatch(fetchPosts(limit, currentPage));
            localStorage.setItem("limits", limit)
        }
    }, [limit, posts]);

    useEffect(() => {
        dispatch(postLoading());
        dispatch(fetchPosts(limit, currentPage));
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        dispatch(fetchPosts(limit, (currentPage * limit)));//offset means how elemenst from the first to avoid not page number
    };

    return (
        <ErrorBoundary
            FallbackComponent={ErrorHandlerPage}
            onError={() => console.log("Error happened!")}
        >
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
        </ErrorBoundary>
    );
}

export default AllPosts;
