import React from 'react';

function SkeletonCard() {
    return (
        <div className='flex flex-col gap-4 p-4 border border-gray-200 rounded-lg shadow-lg h-[600px] w-[300px] animate-pulse'>
            {/* User Info Skeleton */}
            {/* <div className="flex items-center gap-2 p-2 border-b border-gray-200">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div className="flex flex-col">
                    <div className="w-24 h-4 bg-gray-300 rounded"></div>
                    <div className="w-16 h-3 mt-1 bg-gray-300 rounded"></div>
                </div>
            </div> */}

            {/* Image Skeleton */}
            <div className="flex items-center justify-center flex-grow overflow-hidden rounded-lg shadow-md bg-gray-300 w-full h-[300px]"></div>

            {/* Title Skeleton */}
            <div className="flex items-center justify-center flex-grow p-2">
                <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
            </div>

            {/* Content Skeleton */}
            <div className="flex-grow p-2">
                <div className="w-full h-24 bg-gray-300 rounded"></div>
            </div>
        </div>
    );
}

export default SkeletonCard;
