import React from 'react'
import feature1 from '../assets/feature1.png';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { useSelector } from 'react-redux';
import cardPlaceholder from '../assets/centralpush.png';
import appwriteService from '../appwrite/conifg'
function AllArticles() {
    const navigate = useNavigate();
    const ViewAllHandler = (e) => {
        navigate("/all-posts")
    }
    const { posts, status } = useSelector((state) => state.posts || []);
    const slicedPosts = posts?.documents?.slice(6, 12)
    console.log(slicedPosts)
    return (
        <>
            <h1>All Posts</h1>
            <Button onClick={ViewAllHandler}>View all</Button>
            <div className="grid-container">
                <div className="grid-card first-card item">
                    <img
                        src={slicedPosts?.[0]?.featuredImage ? appwriteService.getFilePreview(slicedPosts?.[0]?.featuredImage) : cardPlaceholder}
                        alt="feature-img"
                        className='object-cover card-img' />
                    <div className="grid-body">
                        <h5 className='card-title'>{slicedPosts?.[0]?.title}</h5>
                        <p className='card-sub-title'>Lorem ipsum dolor sit amet.</p>
                        <p className='card-info'
                            dangerouslySetInnerHTML={{ __html: slicedPosts?.[0]?.content }}>
                        </p>
                    </div>
                </div>
                <div className="grid-card second-card item">
                    <img
                        src={slicedPosts?.[1]?.featuredImage ? appwriteService.getFilePreview(slicedPosts?.[1]?.featuredImage) : cardPlaceholder}
                        alt="feature-img"
                        className='object-cover card-img' />
                    <div className="grid-body">
                        <h5 className='card-title'>{slicedPosts?.[1]?.title}</h5>
                        <p className='card-sub-title'>Lorem ipsum dolor sit amet.</p>
                        <p className='card-info'
                            dangerouslySetInnerHTML={{ __html: slicedPosts?.[1]?.content }}>
                        </p>
                    </div>
                </div>
                <div className="col-span-2 grid-card third-card item">
                    <img
                        src={slicedPosts?.[2]?.featuredImage ? appwriteService.getFilePreview(slicedPosts?.[2]?.featuredImage) : cardPlaceholder}
                        alt="feature-img"
                        className='object-cover card-img' />
                    <div className="grid-body">
                        <h5 className='card-title'>{slicedPosts?.[2]?.title}</h5>
                        <p className='card-sub-title'>Lorem ipsum dolor sit amet.</p>
                        <p className='card-info'
                            dangerouslySetInnerHTML={{ __html: slicedPosts?.[2]?.content }}>
                        </p>
                    </div>
                </div>
                <div className="col-span-2 grid-card fourth-card">
                    <img
                        src={slicedPosts?.[3]?.featuredImage ? appwriteService.getFilePreview(slicedPosts?.[3]?.featuredImage) : cardPlaceholder}
                        alt="feature-img"
                        className='object-cover card-img' />
                    <div className="grid-body">
                        <h5 className='card-title'>{slicedPosts?.[3]?.title}</h5>
                        <p className='card-sub-title'>Lorem ipsum dolor sit amet.</p>
                        <p className='card-info'
                            dangerouslySetInnerHTML={{ __html: slicedPosts?.[3]?.content }}>
                        </p>
                    </div>
                </div>
                <div className="col-span-2 grid-card fifth-card">
                    <img
                        src={slicedPosts?.[4]?.featuredImage ? appwriteService.getFilePreview(slicedPosts?.[4]?.featuredImage) : cardPlaceholder}
                        alt="feature-img"
                        className='object-cover card-img' />
                    <div className="grid-body">
                        <h5 className='card-title'>{slicedPosts?.[4]?.title}</h5>
                        <p className='card-sub-title'>Lorem ipsum dolor sit amet.</p>
                        <p className='card-info'
                            dangerouslySetInnerHTML={{ __html: slicedPosts?.[4]?.content }}>
                        </p>
                    </div>
                </div>
            </div>
        </>

    )
}


export default AllArticles
