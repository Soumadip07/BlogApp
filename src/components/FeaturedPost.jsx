import React from 'react';
import cardPlaceholder from '../assets/centralpush.png';
import appwriteService from '../appwrite/conifg';

function FeaturedPost({ post }) {
    return (
        <div className="relative flex justify-center w-full mt-10 feature-box">
            <div className="z-10 flex flex-col transition-all duration-500 ease-in-out transform bg-white shadow-lg rounded-xl hover:scale-105 hover:shadow-2xl md:flex-row">
                <div className="feature-image">
                    <img
                        src={post?.featuredImage ? appwriteService.getFilePreview(post?.featuredImage) : cardPlaceholder}
                        alt="Featured Post"
                        className="object-cover rounded-xl featured-box"
                    />
                </div>
                <div className="flex flex-col justify-between w-full px-5 py-5 md:w-1/2">
                    <div>
                        <p className="mb-2 text-xs font-bold text-blue-500 uppercase">Featured</p>
                        <h3 className="mb-3 text-2xl font-bold">Cheap Airline tickest Great Way to Save</h3>
                        <p className="mb-4 text-sm text-gray-600"
                        // dangerouslySetInnerHTML={{ __html: post?.content }}
                        >
                            In this digital generation where information can be easily obtained within seconds, business cards
                        </p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center">
                            <img
                                src="https://via.placeholder.com/40"
                                alt="Author"
                                className="w-8 h-8 mr-2 rounded-full"
                            />
                            <div>
                                <p className="font-medium">Viola Manisa</p>
                                <p className="text-xs">Verified writer</p>
                            </div>
                        </div>
                        <p>02 May</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeaturedPost;
