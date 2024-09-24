import React, { useEffect, useState } from 'react'
import feature1 from '../assets/feature1.png';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import appwriteService from '../appwrite/conifg'
import cardPlaceholder from '../assets/centralpush.png';

function Popular() {
    const navigate = useNavigate();
    const ViewAllHandler = (e) => {
        navigate("/latest")
    }
    const { posts, status } = useSelector((state) => state.posts || []);
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
        <>
            <h1>Popular Posts</h1>
            <Button onClick={ViewAllHandler}>View all</Button>
            <div className="py-5 row row-cols-1 row-cols-lg-3 align-items-stretch g-4">
                <div className='col'>
                    <div className="card">
                        <img
                            src={filteredPosts?.[0]?.featuredImage ? appwriteService.getFilePreview(filteredPosts?.[0]?.featuredImage) : cardPlaceholder}
                            alt="feature-img"
                            className='card-img' />
                        <div className="card-body">
                            <h5 className='card-title'>{filteredPosts?.[0]?.title}</h5>
                            <p className='card-sub-title'>Lorem ipsum dolor sit amet.</p>
                            <p className='card-info'
                                dangerouslySetInnerHTML={{ __html: filteredPosts?.[0]?.content }}>
                            </p>
                        </div>
                    </div>

                </div>
                <div className="col">
                    <div className="card">
                        <img
                            src={filteredPosts?.[1]?.featuredImage ? appwriteService.getFilePreview(filteredPosts?.[1]?.featuredImage) : cardPlaceholder}
                            alt="feature-img"
                            className='card-img' />                        <div className="card-body">
                            <h5 className='card-title'>{filteredPosts?.[1]?.title}</h5>
                            <p className='card-sub-title'>Lorem ipsum dolor sit amet.</p>
                            <p className='card-info'
                                dangerouslySetInnerHTML={{ __html: filteredPosts?.[1]?.content }}>
                            </p>

                        </div>
                    </div>

                </div>
                <div className="col">
                    <div className="card">
                        <img
                            src={filteredPosts?.[2]?.featuredImage ? appwriteService.getFilePreview(filteredPosts?.[2]?.featuredImage) : cardPlaceholder}
                            alt="feature-img"
                            className='card-img' />                        <div className="card-body">
                            <h5 className='card-title'>{filteredPosts?.[2]?.title}</h5>
                            <p className='card-sub-title'>Lorem ipsum dolor sit amet.</p>
                            <p className='card-info'
                                dangerouslySetInnerHTML={{ __html: filteredPosts?.[2]?.content }}>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </>

    )
}

export default Popular
