import React, { useEffect } from 'react';
import cardPlaceholder from '../assets/centralpush.png';
import appwriteService from '../appwrite/conifg'
function FeatureSlider({ posts }) {
    // console.log(posts)
    useEffect(() => {
        var swiper = new Swiper(".swiper", {
            grabCursor: true,
            speed: 400,
            mousewheel: {
                invert: false,
            },
            scrollbar: {
                el: ".swiper-scrollbar",
                draggable: true,
            },
            slidesPerView: 1,
            spaceBetween: 10,
            // Responsive breakpoints
            breakpoints: {
                900: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
            },
        });

    }, []);

    return (
        <div className='my-10 d-flex align-items-center justify-content-center' style={{ marginTop: '200px' }}>
            <div className="recipe-container">
                <h1>All Articles</h1>
                <div className="swiper">
                    <div className="swiper-wrapper">
                        {posts && posts?.map((post, index) => (
                            <>

                                <div className="swiper-slide post">
                                    <img
                                        className="post-img"
                                        src={post?.featuredImage ? appwriteService.getFilePreview(post?.featuredImage) : cardPlaceholder}
                                        alt="recipe" />

                                    <div className="post-body">
                                        <img
                                            className="post-avatar"
                                            src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/f9d29d0e-f03b-4990-9bc5-ade57a276b41"
                                            alt="avatar" />
                                        <div className="post-detail">
                                            <h2 className="post-name">{post?.title}</h2>
                                            <p className="post-author">Evelyn Taylor</p>
                                        </div>

                                        <div className="post-actions">
                                            <a className="post-like" href="javascript:void(0)"
                                            ><i className="fas fa-heart"></i
                                            ></a>
                                            <button
                                                className="post-actions-controller"
                                                data-target="post1"
                                                aria-controls="post-actions-content"
                                                aria-expanded="false">
                                                <i className="fa-solid fa-ellipsis fa-2xl"></i>
                                            </button>
                                            <div
                                                className="post-actions-content"
                                                id="post1"
                                                data-visible="false"
                                                aria-hidden="true">
                                                <ul role="list" className="grid-flow" data-spacing="small">
                                                    <li>
                                                        <a className="post-actions-link" href="javascript:void(0)">
                                                            <i className="fa-solid fa-folder-open"></i>
                                                            <span>Add to Collection</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="post-actions-link" href="javascript:void(0)">
                                                            <i className="fa-solid fa-eye"></i>
                                                            <span>Show the Recipe</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="post-actions-link" href="javascript:void(0)">
                                                            <i className="fa-solid fa-user-plus"></i>
                                                            <span>Follow the User</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                    <div className="swiper-scrollbar"></div>
                </div>
            </div>
        </div>
    )
}

export default FeatureSlider;
