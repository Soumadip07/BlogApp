import React, { useEffect } from 'react';
import cardPlaceholder from '../assets/centralpush.png';
import appwriteService from '../appwrite/conifg';
// import Swiper bundle with all modules installed
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import image from '../assets/image.png';
// import styles bundle
import 'swiper/css/bundle';
function FeaturedPost({ post }) {
    // console.log(post[0]?.featuredImage)
    return (
        <section className="content" style={{ marginLeft: '250px', paddingTop: '200px' }}>
            <Swiper
                // loop={true}
                slidesPerView={1}
                // allowTouchMove={false} // Disable touch scrolling
                // mousewheel={{ enabled: false }} // Disable mousewheel scrolling
                // pagination={{
                //     el: ".swiper-pagination",
                //     type: "progressbar",
                // }}
                // navigation={{
                //     nextEl: ".swiper-button-next",
                //     prevEl: ".swiper-button-prev",
                // }}
                modules={[Pagination]}
                style={{ width: '80vw', height: '800px' }}
                className="swiper-container"
            >
                {post && post.map((item, index) => (
                    <SwiperSlide key={index} className="flex items-center justify-center w-full h-full swiper-slide">
                        <div className="flex flex-col items-center justify-center w-full h-full p-6 rounded-lg shadow-lg feature-card"> {/* Set to full height and width */}
                            <img
                                src={item?.featuredImage ? appwriteService.getFilePreview(item.featuredImage) : cardPlaceholder}
                                alt="Featured Post"
                                className="object-cover rounded-lg d-block"
                                style={{ width: '100%', height: '600px', objectFit: 'cover' }} // Set width to 100% of the card
                            />
                            <div className="p-2 text-center">
                                <h2 className="text-lg font-semibold">{item.title}</h2>
                                <p className="text-gray-500">{item.description}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
                {/* <div class="swiper-pagination"></div> */}
            </Swiper>
        </section >
    );
}

export default FeaturedPost;
